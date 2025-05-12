import { Tag } from "@/models";
import { TagFixture } from "@tests/fixtures";

export const seedTags = async () => {
    try {
        await Promise.all([
            new Tag(TagFixture.tagData).save(),
            new Tag(TagFixture.tagData2).save(),
            new Tag(TagFixture.tagData3).save(),
        ]);
    } catch (error) {
        console.error("Error seeding tags:", error);
        throw error;
    }
}
