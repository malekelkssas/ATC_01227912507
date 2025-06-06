import request from "supertest";
import { app } from "@/index";
import { HTTP_HEADERS, HTTP_STATUS_CODE, JWT_CONSTANTS, ROUTES } from "@/utils";
import { SignInDto } from "@/types";
import { login } from "@tests/utils";
import { UserFixture } from "@tests/fixtures";
import { Event, User } from "@/models";
import mongoose from "mongoose";


const bookEventRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.BOOK_EVENT}`;
const unbookEventRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.UNBOOK_EVENT}`;
const getBookedEventsRoute = `/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.GET_BOOKED_EVENTS}`;

describe("User APIs", () => {
    describe("Book Event API", () => {
        it("should book an event successfully", async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const events = await Event.find();
            const eventId = events[0]._id;

            // Act
            const response = await request(app)
                .post(`${bookEventRoute}/${eventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.NO_CONTENT);
        });
        it("should return 400 if event id is invalid", async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(`${bookEventRoute}/invalid-event-id`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid ID format");
        });
        
        it("should return 404 if event not found", async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const invalidEventId = new mongoose.Types.ObjectId().toString();

            // Act
            const response = await request(app)
                .post(`${bookEventRoute}/${invalidEventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.NOT_FOUND);
            expect(response.body.message).toBe("Event not found");
        });

        // unauthenticated user
        it("should return 401 if user is not authenticated", async () => {
            // Arrange
            const events = await Event.find();
            const eventId = events[0]._id;

            // Act
            const response = await request(app)
                .post(`${bookEventRoute}/${eventId}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });
    });

    describe("Unbook Event API", () => {
        it("should unbook an event successfully", async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);
            const user = await User.findOne({ email: UserFixture.userData.email! });
            const eventId = user?.bookedEvents[0];

            // Act
            const response = await request(app)
                .post(`${unbookEventRoute}/${eventId}`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.NO_CONTENT);
            const updatedUser = await User.findOne({ email: UserFixture.userData.email! });
            expect(updatedUser?.bookedEvents?.length).toBe(user?.bookedEvents?.length! - 1);
        });

        it("should return 400 if event id is invalid", async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .post(`${unbookEventRoute}/invalid-event-id`)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid ID format");
        });

        // unauthenticated user
        it("should return 401 if user is not authenticated", async () => {
            // Arrange
            const events = await Event.find();
            const eventId = events[0]._id;

             // Act
            const response = await request(app)
                .post(`${unbookEventRoute}/${eventId}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
        });
    });

    describe("Get Booked Events API", () => {
        it("should return 200 if user is authenticated", async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: UserFixture.userData.email!,
                password: UserFixture.userData.password!
            };
            const { token } = await login(signInDto);

            // Act
            const response = await request(app)
                .get(getBookedEventsRoute)
                .set(HTTP_HEADERS.AUTHORIZATION, `${JWT_CONSTANTS.BEARER_PREFIX} ${token}`);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.OK);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it("should return 401 if user is not authenticated", async () => {
            // Arrange
            // PASS: no need to arrange

            // Act
            const response = await request(app)
                .get(getBookedEventsRoute);

            // Assert
            expect(response.status).toBe(HTTP_STATUS_CODE.UNAUTHORIZED);
            expect(response.body.message).toBe("Invalid token");
        });
    });
});
