import { IEvent } from "@/types/interfaces";

export class EventFixture {
    static eventData: Partial<IEvent> = {
        name: {
            en: "Event 1",
            ar: "أحداث 1",
        },
        description: {
            en: "Event 1 description",
            ar: "وصف أحداث 1",
        },
        venue: {
            en: "Event 1 venue",
            ar: "مكان أحداث 1",
        },
        category: [],
        imageUrl: "https://example.com/event1.jpg",
        price: 100,
        date: new Date("2021-01-01"),
    }
    static eventData2: Partial<IEvent> = {
        name: {
            en: "Event 2",
            ar: "أحداث 2",
        },
        description: {
            en: "Event 2 description",
            ar: "وصف أحداث 2",
        },
        venue: {
            en: "Event 2 venue",
            ar: "مكان أحداث 2",
        },
        category: [],
        imageUrl: "https://example.com/event2.jpg",
        price: 200,
        date: new Date("2021-01-02"),
    }
    static eventData3: Partial<IEvent> = {
        name: {
            en: "Event 3",
            ar: "أحداث 3",
        },
        description: {
            en: "Event 3 description",
            ar: "وصف أحداث 3",
        },
        venue: {
            en: "Event 3 venue",
            ar: "مكان أحداث 3",
        },
        category: [],
        imageUrl: "https://example.com/event3.jpg",
        price: 300,
        date: new Date("2021-01-03"),
    }
}