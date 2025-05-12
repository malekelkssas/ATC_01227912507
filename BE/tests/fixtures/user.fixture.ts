import { UserRoleEnum } from "@/types/enums/user-role.enum"
import { IUser } from "@/types/interfaces/IUser"

export class UserFixture {
    static userData: Partial<IUser> = {

    name: "User 1",
    email: "user1@example.com",
    password: "Password123!",
    role: UserRoleEnum.USER,
    }
    static userData2: Partial<IUser> = {
        name: "User 2",
        email: "user2@example.com",
        password: "Password123!",
        role: UserRoleEnum.USER,
    }
    static adminData: Partial<IUser> = {
        name: "Admin",
        email: "admin@example.com",
        password: "Password123!",
        role: UserRoleEnum.ADMIN,
    }
}