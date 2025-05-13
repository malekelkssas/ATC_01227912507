import { seedUsers, seedTags, seedEvents } from '@tests/seeds/data';

export async function setupTestData() {
  try {
    await seedUsers();
    await seedTags();
    // NOTE: The Events are dependent on the Tags, so we need to seed the Tags first
    await seedEvents();
  } catch (error) {
    console.error('Error seeding test data:', error);
    throw error;
  }
}