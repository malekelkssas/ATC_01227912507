import request from 'supertest';
import { app } from '@/index';
import { faker } from '@faker-js/faker';
import { login } from '@tests/utils';
import { HTTP_HEADERS, HTTP_STATUS_CODE, JWT_CONSTANTS, ROUTES } from '@/utils';
import { Event, Tag } from '@/models';
import { UserFixture } from '@tests/fixtures';
import { CreateEventDto, CreateEventResponseDto, GetEventResponseDto, ITag, PaginationQueryDto, PaginationResponseDto, SignInDto, UpdateEventDto } from '@/types';
import mongoose from 'mongoose';

const eventsRoute = `/${ROUTES.BASE}/${ROUTES.EVENTS}`;

describe('Event APIs', () => {
    describe('Get Events/Event API', () => {
        it('should return all events successfully', async () => {
            // Arrange
            const pagination: PaginationQueryDto = {
                page: 0,
                limit: 10
            };
            const queryString = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString()
            }).toString();
            
            // Act
            const response = await request(app)
                .get(`${eventsRoute}?${queryString}`);
            const body: PaginationResponseDto<GetEventResponseDto> = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(body.data.length).toBe(3);
            expect(body.pagination.hasMore).toBe(false);
        });

        it('should return the events with pagination successfully', async () => {
            // Arrange
            const pagination: PaginationQueryDto = {
                page: 0,
                limit: 2
            };
            const queryString = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString()
            }).toString();
            
            // Act
            const response = await request(app)
                .get(`${eventsRoute}?${queryString}`);
            const body: PaginationResponseDto<GetEventResponseDto> = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(body.data.length).toBe(2);
            expect(body.pagination.hasMore).toBe(true);
        });

        it('should return a single event successfully', async () => {
            // Arrange
            const events = await Event.find();
            const eventId = events[0]._id;

            // Act
            const response = await request(app)
                .get(`${eventsRoute}/${eventId}`);
            const body: GetEventResponseDto = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(body.name).toBe(events[0].name.en);
            expect(body.description).toBe(events[0].description.en);
            expect(body.category.length).toBe(1);
            expect(body.category[0].name).toBe((events[0].category[0] as ITag).name.en);
            expect(body.category[0].color).toBe((events[0].category[0] as ITag).color);
            expect(body.venue).toBe(events[0].venue.en);
            expect(body.imageUrl).toBe(events[0].imageUrl);
            expect(body.price).toBe(events[0].price);
            expect(body.date).toBe(events[0].date.toISOString());
        });
        
    });

    describe('Delete Event API', () => {
        it('should delete an event successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const events = await Event.find();
            const eventId = events[0]._id;

            // Act
            const response = await request(app)
                .delete(`${eventsRoute}/${eventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);
            
            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.NO_CONTENT);
            const deletedEvent = await Event.findById(eventId);
            expect(deletedEvent).toBeNull();
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
                .delete(`${eventsRoute}/invalid-id`)
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

            // Act
            const response = await request(app)
                .delete(`${eventsRoute}/invalid-id`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Arrange
            const eventId = new mongoose.Types.ObjectId().toString();

            // Act
            const response = await request(app)
                .delete(`${eventsRoute}/${eventId}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });
    });

    describe('Create Event API', () => {
        it('should create an event successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;
            const createEventDto: CreateEventDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [tagId],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()

            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(createEventDto);
            const body: CreateEventResponseDto = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.CREATED);
            expect(body.name.en).toBe(createEventDto.name.en);
            expect(body.description.en).toBe(createEventDto.description.en);
            expect(body.category.length).toBe(1);
            expect(body.category[0].name.en).toBe((tags[0] as ITag).name.en);
            expect(body.venue.en).toBe(createEventDto.venue.en);
            expect(body.imageUrl).toBe(createEventDto.imageUrl);
            expect(body.price).toBe(createEventDto.price);
            expect(body.date).toBe(createEventDto.date.toISOString());
        });

        it('should return a 400 error if the english name is not provided', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;
            const createEventDto: CreateEventDto = {
                name: {
                    ar: faker.lorem.word()
                } as any,
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [tagId],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()
            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(createEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("English name is required");
        });

        it('should return a 400 error if the name is not provided', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const tags = await Tag.find();
            const tagId = tags[0]._id;
            const createEventDto: CreateEventDto = {
                name: undefined as any,
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [tagId],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()
            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(createEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Name is required");
        });

        it('should return a 400 error if the category is empty', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const createEventDto: CreateEventDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()
            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(createEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Category must be at least 1 item");
        });

        it('should return a 400 error if the category id is invalid', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const createEventDto: CreateEventDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [faker.string.uuid()],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()
            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(createEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid category ID format");
        });

        it('should return a 403 error if the user is not authorized', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const createEventDto: CreateEventDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [faker.string.uuid()],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()
            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(createEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Arrange
            const createEventDto: CreateEventDto = {
                name: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                description: {
                    en: faker.lorem.sentence(),
                    ar: faker.lorem.sentence()
                },
                venue: {
                    en: faker.lorem.word(),
                    ar: faker.lorem.word()
                },
                category: [faker.string.uuid()],
                imageUrl: faker.image.url(),
                price: faker.number.int({ min: 1, max: 1000 }),
                date: faker.date.future()
            };

            // Act
            const response = await request(app)
                .post(eventsRoute)
                .send(createEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });
        
    });

    describe('Update Event API', () => {
        it('should update an event successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const events = await Event.find();
            const eventId = events[0]._id.toString();
            const updateEventDto: UpdateEventDto = {
                name: {
                    en: faker.lorem.word(),
                }
            }

            // Act
            const response = await request(app)
                .patch(`${eventsRoute}/${eventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(updateEventDto);
            

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(response.body.name.en).toBe(updateEventDto.name?.en);
            expect(response.body.name.ar).toBe(events[0].name.ar);
            expect(response.body.category[0].name.en).toBeDefined();
        });

        it('should return a 400 error if the id is not a mongoose id', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const updateEventDto: UpdateEventDto = {
                name: {
                    en: faker.lorem.word(),
                }
            }

            // Act
            const response = await request(app)
                .patch(`${eventsRoute}/invalid-id`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(updateEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid ID format");
        });
        
        it('should return a 400 error if the category is empty array', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.adminData.email!,
                password: UserFixture.adminData.password!
            };
            const { token } = await login(signInDto);
            const events = await Event.find();
            const eventId = events[0]._id.toString();
            const updateEventDto: UpdateEventDto = {
                category: [],
            }

            // Act
            const response = await request(app)
                .patch(`${eventsRoute}/${eventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(updateEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Category must be at least 1 item");
        });

        it('should return a 403 error if the user is not authorized', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const events = await Event.find();
            const eventId = events[0]._id.toString();
            const updateEventDto: UpdateEventDto = {
                name: {
                    en: faker.lorem.word(),
                }
            }

            // Act
            const response = await request(app)
                .patch(`${eventsRoute}/${eventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`)
                .send(updateEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.FORBIDDEN);
            expect(response.body.message).toBe("Forbidden");
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Arrange
            const events = await Event.find();
            const eventId = events[0]._id.toString();
            const updateEventDto: UpdateEventDto = {
                name: {
                    en: faker.lorem.word(),
                }
            }

            // Act
            const response = await request(app)
                .patch(`${eventsRoute}/${eventId}`)
                .send(updateEventDto);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });
        
    });
});

