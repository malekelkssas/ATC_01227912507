import { eventRepository, userRepository } from "@/repository";
import { CreateEventDto, CreateEventResponseDto, GetEventResponseDto, IEvent, ITag, LanguageEnum, PaginationQueryDto, UpdateEventDto, PaginationResponseDto, GetFullEventResponseDto, GetEventsAdminResponseDto, GetEventAdminResponseDto } from "@/types";
import { TagService } from "./tag.service";
import { NotFoundError, transformToDotNotation } from "@/utils";

export class EventService {
    private static eventService: EventService;

    static getInstance() {
        if (!EventService.eventService) {
            EventService.eventService = new EventService();
        }
        return EventService.eventService;
    }

    async createEvent(data: CreateEventDto): Promise<CreateEventResponseDto> {
        const event = await eventRepository.create(data);
        return event as unknown as CreateEventResponseDto;
    }
    async deleteEvent(id: string): Promise<boolean> {
        const result = await eventRepository.delete(id);
        return result;
    }
    async getEvents(language: LanguageEnum, pagination: PaginationQueryDto, userId?: string): Promise<PaginationResponseDto<GetEventResponseDto | GetFullEventResponseDto>> {
        const { data: events, total } = await eventRepository.findWithPagination({}, pagination);
        
        const totalPages = Math.ceil(total / pagination.limit);
        const hasMore = pagination.page < totalPages - 1;
        let data = events.map((event) => EventService.localizeEvent(event, language));
        if (userId) {
            const eventsIds = data.map((event) => event._id.toString());
            const bookedEvents = await userRepository.getBookedEventsFromIds(userId, eventsIds);
            data = data.map((event) => ({ ...event, isBooked: bookedEvents.has(event._id.toString()) }));
        }
        return {
            data,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total,
                hasMore,
                totalPages
            }
        };
    }

    async getFullEvents(pagination: PaginationQueryDto): Promise<PaginationResponseDto<GetEventAdminResponseDto>> {
        const { data: events, total } = await eventRepository.findWithPagination({}, pagination);
        const totalPages = Math.ceil(total / pagination.limit);
        const hasMore = pagination.page < totalPages - 1;
        return {
            data: events as unknown as GetEventsAdminResponseDto,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total,
                hasMore,
                totalPages
            }
        };
    }

    async getEvent(id: string, language: LanguageEnum, userId?: string): Promise<GetEventResponseDto | GetFullEventResponseDto> {
        const event = await eventRepository.findById(id);
        if (!event) {
            throw new NotFoundError("Event not found");
        }
        let data = EventService.localizeEvent(event, language);
        if (userId) {
            const bookedEvents = await userRepository.getBookedEventsFromIds(userId, [id]);
            data = { ...data, isBooked: bookedEvents.has(id) } as GetFullEventResponseDto;
        }
        return data;
    }

    async updateEvent(id: string, data: UpdateEventDto): Promise<UpdateEventDto> {
        const updateData = transformToDotNotation(data);
        const event = await eventRepository.update(id, updateData);
        if (!event) {
            throw new NotFoundError("Event not found");
        }
        return event as unknown as UpdateEventDto;
    }

    static localizeEvent(event: IEvent, language: LanguageEnum): GetEventResponseDto {
        return {
            _id: event._id,
            name: event.name[language],
            description: event.description[language],
            category: event.category.map((cat) => TagService.localizeTag(cat as ITag, language)),
            venue: event.venue[language],
            imageUrl: event.imageUrl,
            price: event.price,
            date: event.date,
        };
    }
}
