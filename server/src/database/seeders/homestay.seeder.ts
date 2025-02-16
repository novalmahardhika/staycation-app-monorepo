import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Homestay } from '../entities/homestay.entity';
import { Category } from '../entities/category.entity';
import { shuffleArray } from '../../utils/shuffle-array';

export default class HomestaySeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    const homestayRepository = datasource.getRepository(Homestay)
    const homestayFactory = factoryManager.get(Homestay)

    const categoryRepository = datasource.getRepository(Category)
    const categories = await categoryRepository.find()

    const homestays = Promise.all(
      Array.from({ length: 30 }).map(async() => {
        const newHomestay = await homestayFactory.make({
          category: shuffleArray(categories)[0]
        })
        return newHomestay 
      })
    )

    await homestayRepository.save( await homestays)
  }
}
