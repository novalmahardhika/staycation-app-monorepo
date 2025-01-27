import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { DestinationLocation } from '../entities/destination-location.entity';

export default setSeederFactory(DestinationLocation, async () => {
  const location = new DestinationLocation();
  const {  city, zipCode, country } = faker.location

  location.city = city()
  location.zipCode = zipCode()
  location.country = country()

  return location;
});
