import * as argon2 from 'argon2';
import { AppDataSource } from './data-source.js';
import { User, UserRole } from '../users/entities/user.entity.js';

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);

  const seedUsers = [
    {
      name: 'مالک سیستم',
      email: 'owner@taskboard.local',
      password: 'owner123',
      role: UserRole.OWNER,
    },
    {
      name: 'مدیر پروژه',
      email: 'manager@taskboard.local',
      password: 'manager123',
      role: UserRole.MANAGER,
    },
    {
      name: 'عضو تیم',
      email: 'member@taskboard.local',
      password: 'member123',
      role: UserRole.MEMBER,
    },
  ];

  for (const u of seedUsers) {
    const existing = await userRepo.findOne({ where: { email: u.email } });
    if (existing) {
      console.log(`⏭️  کاربر ${u.email} از قبل وجود دارد`);
      continue;
    }

    const hashedPassword = await argon2.hash(u.password);
    const user = userRepo.create({
      ...u,
      password: hashedPassword,
      isActive: true,
    });
    await userRepo.save(user);
    console.log(`✅ کاربر ${u.email} ساخته شد`);
  }

  await AppDataSource.destroy();
  console.log('🌱 Seed کامل شد');
}

seed().catch((err) => {
  console.error('❌ خطا در seed:', err);
  process.exit(1);
});
