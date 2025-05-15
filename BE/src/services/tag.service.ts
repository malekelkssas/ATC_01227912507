import { tagRepository } from "@/repository";
import { CreateTagDto, CreateTagResponseDto, GetFullTagsResponseDto, GetTagResponseDto, GetTagsResponseDto, IdParamDto, ITag, LanguageEnum, UpdateTagDto, UpdateTagResponseDto } from "@/types";
import { NotFoundError, transformToDotNotation } from "@/utils";
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

    async getTags(language: LanguageEnum): Promise<GetTagsResponseDto> {
        const tags = await tagRepository.find({});
        return tags.map((tag) => TagService.localizeTag(tag, language));
    }

    async getFullTags(): Promise<GetFullTagsResponseDto> {
        const tags = await tagRepository.find({});
        return tags;
    }

    async deleteTag(id: IdParamDto): Promise<void> {
        await tagRepository.delete(id);
    }

    async updateTag(id: IdParamDto, data: UpdateTagDto): Promise<UpdateTagResponseDto> {
        const updateData = transformToDotNotation(data);
        const tag = await tagRepository.update(id, updateData);
        if (!tag) {
            throw new NotFoundError("Tag not found");
        }
        return tag;
    }

    static localizeTag(tag: ITag, language: LanguageEnum): GetTagResponseDto {
        return {
            _id: tag._id,
            name: tag.name[language],
            color: tag.color,
        };
    }

}