import { tagRepository } from "@/repository";
import { CreateTagDto, CreateTagResponseDto, GetFullTagsResponseDto, GetTagResponseDto, GetTagsResponseDto, IdParamDto, ITag, LanguageEnum } from "@/types";
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
        return tags.map((tag) => this.localizeTag(tag, language));
    }

    async getFullTags(): Promise<GetFullTagsResponseDto[]> {
        const tags = await tagRepository.find({});
        return tags;
    }

    async deleteTag(id: IdParamDto): Promise<void> {
        await tagRepository.delete(id);
    }

    private localizeTag(tag: ITag, language: LanguageEnum): GetTagResponseDto {
        return {
            _id: tag._id,
            name: tag.name[language],
            color: tag.color,
        };
    }

}