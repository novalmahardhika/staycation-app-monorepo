import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { HomestayLocation } from '../entities/homestay-location.entity';
import { HomestayDetail } from '../entities/homestay-detail.entity';
import { Homestay } from '../entities/homestay.entity';
import { faker } from '@faker-js/faker';

export default class HomestaySeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    const homestayRepository = datasource.getRepository(Homestay)
    const homestayFactory = factoryManager.get(Homestay)
    const locationFactory = factoryManager.get(HomestayLocation)
    const detailFactory = factoryManager.get(HomestayDetail)
    
    const locations = await locationFactory.saveMany(10)
    const detail = await detailFactory.saveMany(10)

    const homestays = Promise.all(
      Array.from({ length: 10 }, async (_,index) => {
        const newDest = await homestayFactory.make({
          address: faker.helpers.arrayElement(locations),
          detail: detail[index]
        })
      return newDest
      })
    )
    homestayRepository.save(await homestays)
  }
}
