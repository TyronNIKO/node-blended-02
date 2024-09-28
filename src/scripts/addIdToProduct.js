import { PATH_DB } from "../constants/path.js";
import fs from "node:fs/promises";

const addIdToProduct = async () => {
  try {
    const products = await fs.readFile(PATH_DB, "UTF-8");
    const parsedProducts = JSON.parse(products);
    const result = parsedProducts.map((product, index) => ({
      ...product,
      id: index + Date.now(),
    }));
    const resultToString = JSON.stringify(result, null, 2);
    await fs.writeFile(PATH_DB, resultToString);
  } catch (error) {
    console.log(error);
  }
};
addIdToProduct();
