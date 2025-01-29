import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { generateNumber } from '../../utils/generate-number';
import { Homestay } from '../entities/homestay.entity';

export default setSeederFactory(Homestay, async () => {
  const homestay = new Homestay();

  homestay.name = faker.location.county()
  homestay.image = 'https://images.unsplash.com/photo-1722601505317-428fb18a4ae6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  homestay.price = 500000
  homestay.discount = Math.floor(Math.random() * 101);
  homestay.isPopular = generateNumber(0,1) === 0

  return homestay;
});