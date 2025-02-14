
import { setSeederFactory } from 'typeorm-extension';
import { Homestay } from '../entities/homestay.entity';

export default setSeederFactory(Homestay, async () => {
  const homestay = new Homestay();
  return homestay;
});