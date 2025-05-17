import api from "../axiosConfig";
import { BeRoutesConstants } from "@/utils/constants";
import type { 
    GetEventResponseDto, 
    GetFullEventResponseDto, 
    PaginationQueryDto,
    PaginationResponseDto,
    IdParamDto,
    GetEventAdminResponseDto,
    CreateEventResponseDto,
    UpdateEventDto
} from "@/types/dtos";
import type { ErrorResponse } from "@/types";

const baseUrl = BeRoutesConstants.EVENTS;

export class EventService {
    static async getEvents(query: PaginationQueryDto): Promise<PaginationResponseDto<GetEventResponseDto | GetFullEventResponseDto> | ErrorResponse> {
        const response = await api.get(`/${baseUrl}`, { params: query });
        return response.data;
    }
    static async getEventById(id: IdParamDto): Promise<(GetEventResponseDto | GetFullEventResponseDto) | ErrorResponse> {
        const response = await api.get(`/${baseUrl}/${id}`);
        return response.data;
    }
    static async getFullEvents(query: PaginationQueryDto): Promise<PaginationResponseDto<GetEventAdminResponseDto> | ErrorResponse> {
        const response = await api.get(`/${baseUrl}/${BeRoutesConstants.FULL_EVENTS}`, { params: query });
        return response.data;
    }
    static async deleteEvent(id: IdParamDto): Promise<void | ErrorResponse> {
        const response = await api.delete(`/${baseUrl}/${id}`);
        return response.data;
    }
    static async patchEvent(id: IdParamDto, data: FormData): Promise<UpdateEventDto | ErrorResponse> {
        const response = await api.patch(`/${baseUrl}/${id}`, data);
        return response.data;
    }
    static async createEvent(data: FormData): Promise<CreateEventResponseDto | ErrorResponse> {
        const response = await api.post(`/${baseUrl}`, data);
        return response.data;
    }
}
