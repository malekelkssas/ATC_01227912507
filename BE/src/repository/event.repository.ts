import { BaseRepository, IEvent, CreateEventDto, UpdateEventDto, PaginationQueryDto } from "@/types";
import { Event } from "@/models";
import { EVENT_FIELDS, WrapDatabaseError } from "@/utils";
import { FilterQuery } from "mongoose";

export class EventRepository extends BaseRepository<IEvent> {
    private static eventRepository: EventRepository;

    private constructor() {
        super(Event);
    }

    static getInstance() {
        if (!EventRepository.eventRepository) {
            EventRepository.eventRepository = new EventRepository();
        }
        return EventRepository.eventRepository;
    }

    @WrapDatabaseError
    async create(item: CreateEventDto): Promise<IEvent> {
        return this.model.create(item);
    }

    @WrapDatabaseError
    async update(id: string, item: Record<string, unknown>): Promise<IEvent | null> {
        return this.model.findByIdAndUpdate(id, { $set: item }, { new: true });
    }

    @WrapDatabaseError
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }

    @WrapDatabaseError
    async find(item: FilterQuery<IEvent>): Promise<IEvent[]> {
        return this.model.find(item);
    }

    @WrapDatabaseError
    async findWithPagination(item: FilterQuery<IEvent>, options: PaginationQueryDto): Promise<{ data: IEvent[], total: number }> {
        const [data, total] = await Promise.all([
            this.model.find(item)
                .sort({ [EVENT_FIELDS.DATE]: -1 })
                .skip(options.page * options.limit)
                .limit(options.limit),
            this.model.countDocuments(item)
        ]);
        
        return { data, total };
    }

    @WrapDatabaseError
    async findOne(item: FilterQuery<IEvent>): Promise<IEvent | null> {
        return this.model.findOne(item);
    }

    @WrapDatabaseError
    async findById(id: string): Promise<IEvent | null> {
        return this.model.findById(id);
    }
    
}
