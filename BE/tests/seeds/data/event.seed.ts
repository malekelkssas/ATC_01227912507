import { Event, Tag } from "@/models";
import { EventFixture } from "@tests/fixtures";

// NOTE: there are 3 tags in the database already

export const seedEvents = async () => {
    try {
        const tags = await Tag.find();
        const tagIds = tags.map((tag) => tag._id);
        const eventData = {
            ...EventFixture.eventData,
            category: [tagIds[0]],
        };
        const eventData2 = {
            ...EventFixture.eventData2,
            category: [tagIds[1], tagIds[2]],
        };
        const eventData3 = {
            ...EventFixture.eventData3,
            category: [tagIds[0], tagIds[1], tagIds[2]],
        };
        await Promise.all([
            new Event(eventData).save(),
            new Event(eventData2).save(),
            new Event(eventData3).save(),
        ]);
    } catch (error) {
        console.error("Error seeding events:", error);
        throw error;
    }
}
