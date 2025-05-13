import request from 'supertest';
import { app } from '@/index';
import { UserFixture } from '@tests/fixtures';
import { HTTP_HEADERS, HTTP_STATUS_CODE, JWT_CONSTANTS, ROUTES } from '@/utils';
import { faker } from '@faker-js/faker';
import { login } from '@tests/utils';
import { CreateTagDto, CreateTagResponseDto, SignInDto } from '@/types';
import { Tag } from '@/models';

const tagsRoute = `/${ROUTES.BASE}/${ROUTES.TAGS}`;
const fullTagsRoute = `/${ROUTES.BASE}/${ROUTES.TAGS}/${ROUTES.FULL_TAGS}`;

describe('Tag APIs', () => {
    describe('Create Tag API', () => {
        it('should create a tag successfully', async () => {
            // Arrange
            const createTagDto: CreateTagDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word(),
                },
                color: faker.color.rgb(),
            };
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(tagsRoute)
                .send(createTagDto)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);
            const createTagResponse: CreateTagResponseDto = response.body;
            const tags = await Tag.find();

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.CREATED);
            expect(createTagResponse._id).toBeDefined();
            expect(createTagResponse.name.ar).toEqual(createTagDto.name.ar);
            expect(createTagResponse.name.en).toEqual(createTagDto.name.en);
            expect(createTagResponse.color).toEqual(createTagDto.color);
            expect(tags.length).toBe(4);
        });

        it('should return a validation error if the name is not provided', async () => {
            // Arrange
            const createTagDto: Partial<CreateTagDto> = {
                color: faker.color.rgb(),
            };
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(tagsRoute)
                .send(createTagDto)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Name must be an object with 'en' and 'ar' properties");
        });
        it('should return a validation error if the Arabic name is not provided', async () => {
            // Arrange
            const createTagDto: Partial<CreateTagDto> = {
                name: {
                    en: faker.lorem.word(),
                } as any,
                color: faker.color.rgb(),
            };
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(tagsRoute)
                .send(createTagDto)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Arabic name is required");
        });

        it('should return a validation error if the English name is not provided', async () => {
            // Arrange
            const createTagDto: Partial<CreateTagDto> = {
                name: {
                    ar: faker.lorem.word(),
                } as any,
                color: faker.color.rgb(),
            };
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(tagsRoute)
                .send(createTagDto)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("English name is required");
        });

        it('should return a 403 error if the user is not authorized', async () => {
            // Arrange
            const createTagDto: CreateTagDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word(),
                },
                color: faker.color.rgb(),
            };
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(tagsRoute)
                .send(createTagDto)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });
        
        it('should return a 401 error if the user is not authenticated', async () => {
            // Arrange
            const createTagDto: CreateTagDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word(),
                },
                color: faker.color.rgb(),
            };

            // Act
            const response = await request(app)
                .post(tagsRoute)
                .send(createTagDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });

    });

    describe('Delete Tag API', () => {
        it('should delete a tag successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            let tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .delete(`${tagsRoute}/${tagId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);
            tags = await Tag.find();

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.NO_CONTENT);
            expect(tags.length).toBe(2);
        });

        it('should return a 400 error if the id is not a mongoose id', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .delete(`${tagsRoute}/invalid-id`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid ID format");
        });

        it('should return a 403 error if the user is not authorized', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .delete(`${tagsRoute}/${tagId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Arrange
            const tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .delete(`${tagsRoute}/${tagId}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });
    });

    describe('Get Tags API', () => {
        it('should return all tags successfully', async () => {
            // Arrange
            const tags = await Tag.find();

            // Act
            const response = await request(app)
                .get(tagsRoute);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(response.body.length).toBe(tags.length);
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Act
            const response = await request(app)
                .get(fullTagsRoute);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });

        it('should return a 403 error if the user is not authorized', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .get(fullTagsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });

        it('should return the tags with full object name for admin user', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .get(fullTagsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(response.body[0].name.en).toBeDefined();
            expect(response.body[0].name.ar).toBeDefined();
        });
    })

    describe('Update Tag API', () => {
        it('should update a tag successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;
            const newEnglishName = faker.lorem.word();

            // Act
            const response = await request(app)
                .patch(`${tagsRoute}/${tagId}`)
                .send({
                    name: {
                        en: newEnglishName,
                    }
                })
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(response.body.name.en).toBeDefined();
            expect(response.body.name.ar).toBeDefined();
            expect(response.body.name.en).toBe(newEnglishName);
            expect(response.body.name.ar).toBe(tags[0].name.ar);
        });

        it('should return a 400 error if the id is not a mongoose id', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .patch(`${tagsRoute}/invalid-id`)
                .send({
                    name: {
                        en: faker.lorem.word(),
                    }
                })
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid ID format");
        });
        
        it('should return a 403 error if the user is not authorized', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .patch(`${tagsRoute}/${tagId}`)
                .send({
                    name: {
                        en: faker.lorem.word(),
                    }
                })
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Arrange
            const tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .patch(`${tagsRoute}/${tagId}`)
                .send({
                    name: {
                        en: faker.lorem.word(),
                    }
                });

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });

        it('should return a validation error if the name is not provided', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .patch(`${tagsRoute}/${tagId}`)
                .send({
                    name: {
                    }
                })
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("At least one language field must be provided for name");
        });

        it('should return a validation error if the color is not a valid hex color', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;

            // Act
            const response = await request(app)
                .patch(`${tagsRoute}/${tagId}`)
                .send({
                    color: "invalid-color"
                })
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid color format");
        });
        
    })
});

