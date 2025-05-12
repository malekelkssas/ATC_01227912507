import { ITag } from "@/types/interfaces";

export class TagFixture {
    static tagData: Partial<ITag> = {
        name: {
            en: "Tag 1",
            ar: "تصنيف 1",
        },
        color: "#000000",
    }
    static tagData2: Partial<ITag> = {
        name: {
            en: "Tag 2",
            ar: "تصنيف 2",
        },
        color: "#000000",
    }
    static tagData3: Partial<ITag> = {
        name: {
            en: "Tag 3",
            ar: "تصنيف 3",
        },
        color: "#000000",
    }
}
