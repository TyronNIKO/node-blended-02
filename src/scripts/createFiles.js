import path from "node:path";
import { PATH_DB, PATH_FOLDER } from "../constants/path.js";
import fs from "node:fs/promises";

const createFiles = async () => {
  try {
    const products = await fs.readFile(PATH_DB, "UTF-8");
    const parsedProducts = JSON.parse(products);
    parsedProducts.forEach((product) => {
      const fileName =
        product.name.replaceAll(" ", "_").toLowerCase() + ".json";
      const filePath = path.join(PATH_FOLDER, fileName);
      const data = JSON.stringify(product, null, 2);
      fs.writeFile(filePath, data);
    });
  } catch (error) {
    console.log(error);
  }
};
createFiles();
