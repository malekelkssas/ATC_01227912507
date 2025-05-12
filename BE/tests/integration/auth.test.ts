import request from 'supertest';
import { app } from '@/index';
import { UserFixture } from '@tests/fixtures';
import { HTTP_STATUS_CODE, ROUTES } from '@/utils';
import { CreateUserDto, CreateUserResponseDto, GetUserResponseDto, RefreshTokenResponseDto, SignInDto, SignInResponseDto, UserRoleEnum } from '@/types';
import { faker } from '@faker-js/faker';
import { login } from '@tests/utils';

const loginRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.SIGN_IN}`;
const registerRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.SIGN_UP}`;
const refreshTokenRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.REFRESH_TOKEN}`;
const meRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.ME}`;
const testValidPassword = "Test@123";

describe('Auth APIs', () => {
    describe('Login API', () => {
        it('should login a user successfully', async () => {

            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
    
            // Act
            const response = await request(app).post(loginRoute).send(signInDto);
            const signInResponse: SignInResponseDto = response.body;
    
            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(signInResponse.user).toBeDefined();
            expect(signInResponse.token).toBeDefined();
            expect(signInResponse.refreshToken).toBeDefined();
            expect(signInResponse.user.email).toBe(signInDto.email);
            expect(signInResponse.user.name).toBe(UserFixture.userData.name);
            expect(signInResponse.user.role).toBe(UserFixture.userData.role);
        });
    
        it('should not login a user with wrong password', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: "FakeP0ssword"
            };
    
            // Act
            const response = await request(app).post(loginRoute).send(signInDto);
            const signInResponse = response.body;
    
            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(signInResponse.message).toBe("Invalid password");
        });

        it('should not login a user with invalid password', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: "123456"
            };
    
            // Act
            const response = await request(app).post(loginRoute).send(signInDto);
            const signInResponse = response.body;
    
            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(signInResponse.message).toBe("Wrong password");
        });
    
        it('should not login a user with wrong email', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: "FakeEmail@gmail.com",
                password: UserFixture.userData.password!
            };
    
            // Act
            const response = await request(app).post(loginRoute).send(signInDto);
            const signInResponse = response.body;
    
            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(signInResponse.message).toBe("Invalid email");
        });

        it('should not login a user with invalid email', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: "InvalidEmail",
                password: UserFixture.userData.password!
            };

            // Act
            const response = await request(app).post(loginRoute).send(signInDto);
            const signInResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(signInResponse.message).toBe("Wrong email");
        });

        it('should refresh token successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { refreshToken } = await login(signInDto);
            
            // Act
            const response = await request(app)
                .post(refreshTokenRoute)
                .set('Authorization', `Bearer ${refreshToken}`)
                .set('Content-Type', 'application/json');
            const refreshTokenResponse: RefreshTokenResponseDto = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(refreshTokenResponse.token).toBeDefined();
        });

        it('should not refresh token with invalid token', async () => {
            // Arrange
            const refreshToken = "InvalidToken";

            // Act
            const response = await request(app).post(refreshTokenRoute).set('Authorization', `Bearer ${refreshToken}`);
            const refreshTokenResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(refreshTokenResponse.message).toBe("Invalid token");
        });

        it('should get user details successfully', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app).get(meRoute).set('Authorization', `Bearer ${token}`);
            const meResponse: GetUserResponseDto = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(meResponse.user.email).toBe(UserFixture.userData.email);
        });

        it('should not get user details with invalid token', async () => {
            // Arrange
            const token = "InvalidToken";

            // Act
            const response = await request(app).get(meRoute).set('Authorization', `Bearer ${token}`);
            const meResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(meResponse.message).toBe("Invalid token");
        });
    });

    describe('Register API', () => {
        it('should register a new user successfully', async () => {
            // Arrange
            const registerDto: CreateUserDto = {
                email: faker.internet.email(),
                password: testValidPassword,
                name: faker.person.fullName(),
                role: UserRoleEnum.USER
            };
    
            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse: CreateUserResponseDto = response.body;
    
            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.CREATED);
            expect(registerResponse.success).toBe(true);
        });

        it('should not register a user with already existing email', async () => {
            // Arrange
            const registerDto: CreateUserDto = {
                email: UserFixture.userData.email!,
                password: testValidPassword,
                name: faker.person.fullName(),
                role: UserRoleEnum.USER
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("User already exists");
        });

        it('should not register a user with invalid email', async () => {
            // Arrange
            const registerDto: CreateUserDto = {
                email: "InvalidEmail",
                password: testValidPassword,
                name: faker.person.fullName(),
                role: UserRoleEnum.USER
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("Please enter a valid email address");
        });

        it('should not register a user with empty email', async () => {
            // Arrange
            const registerDto: Partial<CreateUserDto> = {
                password: testValidPassword,
                name: faker.person.fullName(),
                role: UserRoleEnum.USER
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("Email is required");
        });

        it('should not register a user with invalid password', async () => {
            // Arrange
            const registerDto: CreateUserDto = {
                email: faker.internet.email(),
                password: "123456",
                name: faker.person.fullName(),
                role: UserRoleEnum.USER
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("Password must be at least 8 characters long");
        });
        
        it('should not register a user with empty password', async () => {
            // Arrange
            const registerDto: Partial<CreateUserDto> = {
                email: faker.internet.email(),
                name: faker.person.fullName(),
                role: UserRoleEnum.USER
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("Password is required");
        });

        it('should not register a user with empty name', async () => {
            // Arrange
            const registerDto: Partial<CreateUserDto> = {
                email: faker.internet.email(),
                password: testValidPassword,
                role: UserRoleEnum.USER
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("Name is required");
        });

        it('should not register a user with admin role', async () => {
            // Arrange
            const registerDto = {
                email: faker.internet.email(),
                password: testValidPassword,
                name: faker.person.fullName(),
                role: UserRoleEnum.ADMIN
            };

            // Act
            const response = await request(app).post(registerRoute).send(registerDto);
            const registerResponse = response.body;

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(registerResponse.message).toBe("Invalid literal value, expected \"user\"");
        });
    });
});