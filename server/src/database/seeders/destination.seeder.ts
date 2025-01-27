import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DestinationLocation } from '../entities/destination-location.entity';
import { DetailDestination } from '../entities/detail-destination.entity';
import { Destination } from '../entities/destination.entity';
import { faker } from '@faker-js/faker';

export default class DestinationSeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    const destinationRepository = datasource.getRepository(Destination)
    const destinationFactory = factoryManager.get(Destination)
    const locationFactory = factoryManager.get(DestinationLocation)
    const detailFactory = factoryManager.get(DetailDestination)
    
    const locations = await locationFactory.saveMany(10)
    const detail = await detailFactory.saveMany(10)

    const destinations = Promise.all(
      Array.from({ length: 10 }, async (_,index) => {
        const newDest = await destinationFactory.make({
          address: faker.helpers.arrayElement(locations),
          detail: detail[index]
        })
      return newDest
      })
    )
    destinationRepository.save(await destinations)
  }
}
