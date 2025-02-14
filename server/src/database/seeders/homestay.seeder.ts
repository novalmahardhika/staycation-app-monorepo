import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';


export default class HomestaySeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    console.log(datasource);
    console.log(factoryManager);
  }
}
