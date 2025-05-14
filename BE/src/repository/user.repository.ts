import { BaseRepository, PaginationQueryDto, IEvent, IUser } from "@/types";
import { User } from "@/models";
import { EVENT_FIELDS, USER_FIELDS, WrapDatabaseError } from "@/utils";
import mongoose, { FilterQuery } from "mongoose";
import bcrypt from "bcrypt";


export class UserRepository extends BaseRepository<IUser> {
    private static userRepository: UserRepository;

    private constructor() {
        super(User);
    }

    static getInstance() {
        if (!UserRepository.userRepository) {
            UserRepository.userRepository = new UserRepository();
        }
        return UserRepository.userRepository;
    }

    @WrapDatabaseError
    async update(id: string, item: Partial<IUser>): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true }).select(`-${USER_FIELDS.PASSWORD} -${USER_FIELDS.BOOKED_EVENTS}`);
    }

    @WrapDatabaseError
    async addEventToBookedEvents(id: string, eventId: string): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(id, { $addToSet: { bookedEvents: eventId } }, { new: true });
    }

    @WrapDatabaseError
    async removeEventFromBookedEvents(id: string, eventId: string): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(id, { $pull: { bookedEvents: eventId } }, { new: true });
    }

    @WrapDatabaseError
    async getBookedEvents(id: string, options: PaginationQueryDto): Promise<{ data: IEvent[], total: number }> {
        const [user, total] = await Promise.all([
            this.model.findById(id).populate({
                path: USER_FIELDS.BOOKED_EVENTS,
                options: {
                    sort: { [EVENT_FIELDS.DATE]: -1 },
                    skip: options.page * options.limit,
                    limit: options.limit
                }
            }),
            this.model.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                { $project: { count: { $size: `$${USER_FIELDS.BOOKED_EVENTS}` } } }
            ]).then(result => result[0]?.count || 0)
        ]);

        if (!user) return { data: [], total: 0 };

        return {
            data: user.bookedEvents as IEvent[],
            total
        };
    }

    @WrapDatabaseError
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }

    @WrapDatabaseError
    async find(item: Partial<IUser>): Promise<IUser[]> {
        return this.model.find(item as FilterQuery<IUser>).select(`-${USER_FIELDS.PASSWORD} -${USER_FIELDS.BOOKED_EVENTS}`);
    }

    @WrapDatabaseError
    async findOne(item: FilterQuery<IUser>): Promise<IUser | null> {
        return this.model.findOne(item).select(`-${USER_FIELDS.PASSWORD} -${USER_FIELDS.BOOKED_EVENTS}`);
    }

    @WrapDatabaseError
    async findById(id: string): Promise<IUser | null> {
        return this.model.findById(id).select(`-${USER_FIELDS.PASSWORD} -${USER_FIELDS.BOOKED_EVENTS}`);
    }
    
    @WrapDatabaseError
    async getUserByEmailWithPassword(email: string): Promise<IUser | null> {
        return this.model.findOne({ email }).select(`-${USER_FIELDS.BOOKED_EVENTS}`);
    }

    @WrapDatabaseError
    async comparePassword(user: IUser, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }

    @WrapDatabaseError
    async getBookedEventsFromIds(userId: string, eventIds: string[]): Promise<Set<string>> {
        const user = await this.model.findOne(
            { 
                _id: userId,
                bookedEvents: { $in: eventIds }
            },
            { bookedEvents: 1 }
        ).lean();

        return new Set(user?.bookedEvents?.map(id => id.toString()) || []);
    }
}