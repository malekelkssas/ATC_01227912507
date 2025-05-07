import { userRepository } from "@/repository";
import { CreateUserDto, CreateUserResponseDto, SignInDto, SignInResponseDto } from "@/types";
import { generateRefreshToken, generateToken, NotFoundError, UnauthorizedError } from "@/utils";
import bcrypt from "bcrypt";


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
}