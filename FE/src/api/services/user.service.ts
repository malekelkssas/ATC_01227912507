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

const baseUrl = BeRoutesConstants.USERS;

export class UserService {
    static async createUser(dto: CreateUserDto): Promise<CreateUserResponseDto> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.SIGN_UP}`, dto);
        return response.data;
    }
    static async signIn(dto: SignInDto): Promise<SignInResponseDto> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.SIGN_IN}`, dto);
        return response.data;
    }
    static async getUser(): Promise<GetUserResponseDto> {
        const response = await api.get(`/${baseUrl}/${BeRoutesConstants.ME}`);
        return response.data;
    }
    static async refreshToken(): Promise<RefreshTokenResponseDto> {
        const response = await api.post(`/${baseUrl}/${BeRoutesConstants.REFRESH_TOKEN}`);
        return response.data;
    }
    
}
