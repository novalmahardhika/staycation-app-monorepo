import { faker } from '@faker-js/faker';
import { Destination } from '../entities/destination.entity';
import { setSeederFactory } from 'typeorm-extension';
import { generateNumber } from '../../utils/generate-number';

export default setSeederFactory(Destination, async () => {
  const destination = new Destination();

  destination.name = faker.location.county()
  destination.image = 'https://images.unsplash.com/photo-1722601505317-428fb18a4ae6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  destination.price = 500000
  destination.discount = Math.floor(Math.random() * 101);
  destination.isPopular = generateNumber(0,1) === 0

  return destination;
});