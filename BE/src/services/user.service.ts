import { config } from "@/config";
import { userRepository } from "@/repository";
import { CreateUserDto, CreateUserResponseDto, GetEventResponseDto, GetFullEventResponseDto, GetFullEventsResponseDto, GetUserResponseDto, IJwtUser, LanguageEnum, PaginationQueryDto, PaginationResponseDto, RefreshTokenResponseDto, SignInDto, SignInResponseDto } from "@/types";
import { generateRefreshToken, generateToken, NotFoundError, UnauthorizedError } from "@/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EventService } from "./event.service";

export class UserService {
    private static userService: UserService;

    static getInstance() {
        if (!UserService.userService) {
            UserService.userService = new UserService();
        }
        return UserService.userService;
    }

    signIn = async (data: SignInDto) => {
        const user = await userRepository.getUserByEmailWithPassword(data.email);
        if (!user) {
            throw new UnauthorizedError("Invalid email");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid password");
        }
        const token = generateToken({ id: user._id, email: user.email, name: user.name, role: user.role });
        const refreshToken = generateRefreshToken(user._id);
        return {
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        } as SignInResponseDto;
    }

    signUp = async (data: CreateUserDto) => {
        await userRepository.create(data);
        return {
            success: true,
        } as CreateUserResponseDto;
    }

    getUser = async (id: string): Promise<GetUserResponseDto> => {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        } as GetUserResponseDto;
    }

    refreshToken = async (refreshToken: string): Promise<RefreshTokenResponseDto> => {
        let userId: string | undefined;
        try {
            const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as Partial<IJwtUser>;
            userId = decoded.id;
        } catch {
            throw new UnauthorizedError("Invalid token");
        }
        if (!userId) {
            throw new UnauthorizedError("Invalid token");
        }
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        const token = generateToken({ id: user._id, email: user.email, name: user.name, role: user.role });
        return {
            token,
        } as RefreshTokenResponseDto;
    }

    addEventToBookedEvents = async (userId: string, eventId: string): Promise<boolean> => {
        const user = await userRepository.addEventToBookedEvents(userId, eventId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return true;
    }

    removeEventFromBookedEvents = async (userId: string, eventId: string): Promise<boolean> => {
        const user = await userRepository.removeEventFromBookedEvents(userId, eventId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return true;
    }

    getBookedEvents = async (userId: string, language: LanguageEnum, pagination: PaginationQueryDto): Promise<PaginationResponseDto<GetEventResponseDto>> => {
        const { data: events, total } = await userRepository.getBookedEvents(userId, pagination);
        
        const totalPages = Math.ceil(total / pagination.limit);
        const hasMore = pagination.page < totalPages - 1;
        return {
            data: events.map((event) => EventService.localizeEvent(event, language)),
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total,
                hasMore,
                totalPages,
            }
        }
    }
}