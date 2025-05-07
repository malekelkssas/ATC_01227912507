import { User } from "@/models";
import { UserFixture } from "@tests/fixtures";
export const seedUsers = async () => {
    try {
        await Promise.all([
            new User(UserFixture.userData).save(),
            new User(UserFixture.userData2).save(),
            new User(UserFixture.adminData).save()
        ]);
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}
