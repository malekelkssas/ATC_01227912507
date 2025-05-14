import { Event, User } from "@/models";
import { UserFixture } from "@tests/fixtures";
export const seedUsers = async () => {
    const events = await Event.find();
    const eventIds = events.map((event) => event._id);
    try {
        await Promise.all([
            new User({
                ...UserFixture.userData,
                bookedEvents: [eventIds[0]]
            }).save(),
            new User({
                ...UserFixture.userData2,
                bookedEvents: [eventIds[1], eventIds[2]]
            }).save(),
            new User({
                ...UserFixture.adminData,
                bookedEvents: [eventIds[0], eventIds[1], eventIds[2]]
            }).save()
        ]);
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}
