import { BeRoutesConstants } from "@/utils/constants";
import api from "../axiosConfig";
import type { CreateTagDto, GetFullTagsResponseDto, GetTagsResponseDto, UpdateTagDto } from "@/types/dtos/tag.dto";
import type { ErrorResponse } from "react-router-dom";

const baseUrl = BeRoutesConstants.TAGS;

export class TagService {
    static async getTags(): Promise<GetTagsResponseDto | ErrorResponse> {
        const response = await api.get(`/${baseUrl}`);
        return response.data;
    }
    static async getFullTags(): Promise<GetFullTagsResponseDto | ErrorResponse> {
        const response = await api.get(`/${baseUrl}/${BeRoutesConstants.FULL_TAGS}`);
        return response.data;
    }
    static async deleteTag(tagId: string): Promise<void | ErrorResponse> {
        const response = await api.delete(`/${baseUrl}/${tagId}`);
        return response.data;
    }
    static async createTag(tag: CreateTagDto): Promise<void> {
        await api.post(`/${baseUrl}`, tag);
    }
    static async updateTag(tagId: string, tag: UpdateTagDto): Promise<void> {
        await api.patch(`/${baseUrl}/${tagId}`, tag);
    }
}