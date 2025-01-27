import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { DetailDestination } from '../entities/detail-destination.entity';
import { generateNumber } from '../../utils/generate-number';

export default setSeederFactory(DetailDestination, async () => {
  const detail = new DetailDestination();

  detail.owner = faker.person.fullName()
  detail.images = ['https://rb.gy/t85903','https://rb.gy/fr3j9t','https://rb.gy/0wt3us'],
  detail.description = faker.lorem.paragraphs()
  detail.bathroom = generateNumber(0,10)
  detail.bedroom = generateNumber(0,10)
  detail.livingRoom = generateNumber(0,10)
  detail.kitchen = generateNumber(0,10)
  detail.airConditioner = generateNumber(0,10)
  detail.refrigerator = generateNumber(0,10)
  detail.television = generateNumber(0,10)
  detail.wifi = generateNumber(0,10)
  detail.swimmingPool = generateNumber(0,2)

  return detail;
});
