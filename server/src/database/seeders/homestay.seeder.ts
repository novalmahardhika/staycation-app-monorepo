import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Homestay } from '../entities/homestay.entity';


export default class HomestaySeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    const homestayFactory = factoryManager.get(Homestay) 
    await homestayFactory.saveMany(30)
  }
}
