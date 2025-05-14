import { seedUsers, seedTags, seedEvents } from '@tests/seeds/data';

export async function setupTestData() {
  try {
    // NOTE: The Events are dependent on the Tags, so we need to seed the Tags first
    await seedTags();
    // NOTE: The Users are dependent on the Events, so we need to seed the Events first
    await seedEvents();
    await seedUsers();
  } catch (error) {
    console.error('Error seeding test data:', error);
    throw error;
  }
}