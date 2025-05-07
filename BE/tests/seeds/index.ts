import { seedUsers } from '@tests/seeds/data';

export async function setupTestData() {
  try {
    await seedUsers();
  } catch (error) {
    console.error('Error seeding test data:', error);
    throw error;
  }
}