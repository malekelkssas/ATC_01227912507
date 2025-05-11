import { BaseRepository, CreateTagDto } from "@/types";
import { Tag } from "@/models";
import { ITag } from "@/types";
import { WrapDatabaseError } from "@/utils";
import { FilterQuery } from "mongoose";


export class TagRepository extends BaseRepository<ITag> {
    private static tagRepository: TagRepository;

    private constructor() {
        super(Tag);
    }

    static getInstance() {
        if (!TagRepository.tagRepository) {
            TagRepository.tagRepository = new TagRepository();
        }
        return TagRepository.tagRepository;
    }

    @WrapDatabaseError
    async update(id: string, item: Partial<ITag>): Promise<ITag | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true });
    }

    @WrapDatabaseError
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }


    @WrapDatabaseError
    async find(item: FilterQuery<ITag>): Promise<ITag[]> {
        return this.model.find(item);
    }

    @WrapDatabaseError
    async findOne(item: FilterQuery<ITag>): Promise<ITag | null> {
        return this.model.findOne(item);
    }

    @WrapDatabaseError
    async findById(id: string): Promise<ITag | null> {
        return this.model.findById(id);
    }

    @WrapDatabaseError
    async create(item: CreateTagDto): Promise<ITag> {
        return this.model.create(item);
    }
}