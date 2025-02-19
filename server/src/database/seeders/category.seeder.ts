import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from '../entities/category.entity';
import { CATEGORIES } from '../../common/constants/seeder.constant';
export default class CategorySeeder implements Seeder {
  async run(datasource: DataSource, factoryManager: SeederFactoryManager) {
    const categoryRepository = datasource.getRepository(Category)
    const categoryFactory = factoryManager.get(Category) 
    const categories = Promise.all(
      CATEGORIES.map( async (category)=> {
        const newCAtegory = await categoryFactory.make({
          name: category
        })
        return newCAtegory
      })
    )
    await categoryRepository.save(await categories)
  }
}
