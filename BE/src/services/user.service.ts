import { config } from "@/config";
import { userRepository } from "@/repository";
import { CreateUserDto, CreateUserResponseDto, GetUserResponseDto, IJwtUser, RefreshTokenResponseDto, SignInDto, SignInResponseDto } from "@/types";
import { generateRefreshToken, generateToken, NotFoundError, UnauthorizedError } from "@/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    refreshToken = async (token: string): Promise<RefreshTokenResponseDto> => {
        const { id: userId } = jwt.verify(token, config.jwtRefreshSecret) as Partial<IJwtUser>;
        if (!userId) {
            throw new UnauthorizedError("Invalid token");
        }
        
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        const refreshToken = generateRefreshToken(user._id);
        return {
            refreshToken,
        } as RefreshTokenResponseDto;
    }
}