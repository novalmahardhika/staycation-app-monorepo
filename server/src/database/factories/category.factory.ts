import { setSeederFactory } from "typeorm-extension";
import { Category } from "../entities/category.entity";

export default setSeederFactory(Category, async () => {
  const category = new Category()
  return category
})