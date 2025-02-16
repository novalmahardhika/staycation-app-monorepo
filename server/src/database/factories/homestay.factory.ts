
import { setSeederFactory } from 'typeorm-extension';
import { Homestay } from '../entities/homestay.entity';
import { faker } from '@faker-js/faker';
import { generateNumber } from '../../utils/generate-number';
import { FACILITIES, IMAGES } from '../../utils/constanst';
import { shuffleArray } from '../../utils/shuffle-array';

export default setSeederFactory(Homestay, async () => {
  const homestay = new Homestay();
  const images = shuffleArray(IMAGES).slice(0,3)
  const facilities = FACILITIES.map((item)=> ({...item, qty: generateNumber(0, 10)}))
  
  homestay.name = faker.location.continent()
  homestay.price = generateNumber(10, 400)
  homestay.isPopular = generateNumber(0,1) === 1 ? true : false
  homestay.city = faker.location.city()
  homestay.country = faker.location.country()
  homestay.images = images
  homestay.facilities = facilities
  homestay.description = faker.lorem.paragraphs({ min: 3, max: 5 }, '/n')
  
  return homestay;
});


