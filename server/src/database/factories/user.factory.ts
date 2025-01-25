/* eslint-disable prettier/prettier */
import { User } from '../entities/user.entity';
import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, () => {
  const user = new User();
  const { street, city, zipCode } = faker.location

  user.firstName = faker.person.firstName(),
  user.lastName = faker.person.lastName(),
  user.email = faker.internet.email(),
  user.password = 'user12345',
  user.phone = faker.phone.number();
  user.address = `${street()} ${zipCode()}, ${city()} `

  return user;
});
