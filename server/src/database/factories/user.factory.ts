import { hash } from 'bcrypt'
import { User } from '../entities/user.entity';
import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';


export default setSeederFactory(User, async () => {
  const user = new User();
  const { street, city, zipCode, } = faker.location

  user.firstName = faker.person.firstName(),
  user.lastName = faker.person.lastName(),
  user.email = faker.internet.email(),
  user.password = await hash('user12345',10),
  user.image = faker.image.avatar(),
  user.phone = faker.phone.number();
  user.address = `${street()} ${zipCode()}, ${city()} `

  return user;
});
