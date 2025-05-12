import { seedUsers, seedTags } from '@tests/seeds/data';

export async function setupTestData() {
  try {
    await seedUsers();
    await seedTags();
  } catch (error) {
    console.error('Error seeding test data:', error);
    throw error;
  }
}