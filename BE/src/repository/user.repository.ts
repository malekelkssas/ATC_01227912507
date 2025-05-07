import { BaseRepository } from "@/types";
import { User } from "@/models";
import { IUser } from "@/types";
import { USER_FIELDS, WrapDatabaseError } from "@/utils";
import { FilterQuery } from "mongoose";
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
        return this.model.findByIdAndUpdate(id, item, { new: true }).select(`-${USER_FIELDS.PASSWORD}`);
    }

    @WrapDatabaseError
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }

    @WrapDatabaseError
    async find(item: Partial<IUser>): Promise<IUser[]> {
        return this.model.find(item as FilterQuery<IUser>).select(`-${USER_FIELDS.PASSWORD}`);
    }

    @WrapDatabaseError
    async findOne(item: FilterQuery<IUser>): Promise<IUser | null> {
        return this.model.findOne(item).select(`-${USER_FIELDS.PASSWORD}`);
    }

    @WrapDatabaseError
    async findById(id: string): Promise<IUser | null> {
        return this.model.findById(id).select(`-${USER_FIELDS.PASSWORD}`);
    }
    
    @WrapDatabaseError
    async getUserByEmailWithPassword(email: string): Promise<IUser | null> {
        return this.model.findOne({ email });
    }

    @WrapDatabaseError
    async comparePassword(user: IUser, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}