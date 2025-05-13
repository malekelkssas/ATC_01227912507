import { eventRepository } from "@/repository";
import { CreateEventDto, CreateEventResponseDto, GetEventResponseDto, IEvent, ITag, LanguageEnum, PaginationQueryDto, UpdateEventDto, PaginationResponseDto } from "@/types";
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
    async getEvents(language: LanguageEnum, pagination: PaginationQueryDto): Promise<PaginationResponseDto<GetEventResponseDto>> {
        const { data: events, total } = await eventRepository.findWithPagination({}, pagination);
        
        const totalPages = Math.ceil(total / pagination.limit);
        const hasMore = pagination.page < totalPages - 1;

        return {
            data: events.map((event) => EventService.localizeEvent(event, language)),
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total,
                hasMore,
                totalPages
            }
        };
    }

    async getEvent(id: string, language: LanguageEnum): Promise<GetEventResponseDto> {
        const event = await eventRepository.findById(id);
        if (!event) {
            throw new NotFoundError("Event not found");
        }
        return EventService.localizeEvent(event, language);
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
