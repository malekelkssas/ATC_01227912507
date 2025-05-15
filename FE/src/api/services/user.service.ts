import api from "../axiosConfig";
import { BeRoutesConstants } from "@/utils/constants";
import type {
  CreateUserDto,
  CreateUserResponseDto,
  SignInDto,
  SignInResponseDto,
  GetUserResponseDto,
  RefreshTokenResponseDto,
} from "@/types/dtos";
import type { ErrorResponse } from "@/types";
import { HTTP_STATUS_CODE } from "@/utils/constants";

const baseUrl = BeRoutesConstants.USERS;

export class UserService {
    static async createUser(dto: CreateUserDto): Promise<CreateUserResponseDto | ErrorResponse> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.SIGN_UP}`, dto);
        return response.data;
    }
    static async signIn(dto: SignInDto): Promise<SignInResponseDto | ErrorResponse> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.SIGN_IN}`, dto);
        return response.data;
    }
    static async getMe(): Promise<GetUserResponseDto | ErrorResponse> {
        const response = await api.get(`/${baseUrl}/${BeRoutesConstants.ME}`);
        return response.data;
    }
    static async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto | ErrorResponse> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.REFRESH_TOKEN}`, null, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        return response.data;
    }
    static async bookEvent(eventId: string): Promise<void | ErrorResponse> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.BOOK_EVENT}/${eventId}`);
        if(response.status === HTTP_STATUS_CODE.NO_CONTENT) {
            return;
        }
        return response.data;
    }
    static async unbookEvent(eventId: string): Promise<void | ErrorResponse> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.UNBOOK_EVENT}/${eventId}`);
        if(response.status === HTTP_STATUS_CODE.NO_CONTENT) {
            return;
        }
        return response.data;
    }
}
