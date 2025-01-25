import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userRepository = datasource.getRepository(User);
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
