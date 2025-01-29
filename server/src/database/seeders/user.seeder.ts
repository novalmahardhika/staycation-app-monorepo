import { hash } from 'bcrypt'
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    const userRepository = datasource.getRepository(User);
    const userFactory = factoryManager.get(User);
    const admin = {
      firstName: 'admin',
      email: 'admin@admin.com',
      password: await hash('admin',10),
    }
    const checkAdmin = await userRepository.findOneBy({ email: 'admin@admin.com' }) 
    if (!checkAdmin) {
      await userRepository.insert([admin])
    }
    await userFactory.saveMany(5);
  }
}
