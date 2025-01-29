import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { HomestayLocation } from '../entities/homestay-location.entity';

export default setSeederFactory(HomestayLocation, async () => {
  const location = new HomestayLocation();
  const {  city, zipCode, country } = faker.location

  location.city = city()
  location.zipCode = zipCode()
  location.country = country()

  return location;
});
