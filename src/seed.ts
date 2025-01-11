// src/seed.ts
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized for seeding');

    const userRepo = AppDataSource.getRepository(User);

    // Check if there's already a user
    const existingUser = await userRepo.findOneBy({ businessName: 'Dev User' });
    if (!existingUser) {
      const testUser = userRepo.create({
        businessName: 'Dev User',
      });
      await userRepo.save(testUser);
      console.log('Seeded test user:', testUser);
    } else {
      console.log('Test user already exists; skipping seed.');
    }

    await AppDataSource.destroy();
    console.log('Data Source closed after seeding');
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

// Only run seed if called via CLI (not imported)
if (require.main === module) {
  seed();
}
