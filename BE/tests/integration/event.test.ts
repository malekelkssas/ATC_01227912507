import request from 'supertest';
import { app } from '@/index';
import { faker } from '@faker-js/faker';
import { login } from '@tests/utils';
import { HTTP_HEADERS, HTTP_STATUS_CODE, JWT_CONSTANTS, ROUTES } from '@/utils';
import { Event, Tag } from '@/models';
import { UserFixture } from '@tests/fixtures';
import { GetEventResponseDto, ITag, PaginationQueryDto, PaginationResponseDto, SignInDto } from '@/types';

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
});

