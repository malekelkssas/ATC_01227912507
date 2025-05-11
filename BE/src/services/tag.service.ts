import { tagRepository } from "@/repository";
import { CreateTagDto, CreateTagResponseDto, GetTagsResponseDto, IdParamDto } from "@/types";
export class TagService {
    private static tagService: TagService;

    static getInstance() {
        if (!TagService.tagService) {
            TagService.tagService = new TagService();
        }
        return TagService.tagService;
    }

    async createTag(data: CreateTagDto): Promise<CreateTagResponseDto> {
        const tag = await tagRepository.create(data);
        return tag;
    }

    async getTags(): Promise<GetTagsResponseDto> {
        const tags = await tagRepository.find({});
        return tags;
    }
    async deleteTag(id: IdParamDto): Promise<void> {
        await tagRepository.delete(id);
    }

}