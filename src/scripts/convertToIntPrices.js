import {PATH_DB} from "../constants/path.js";
import fs from "node:fs/promises";

const convertToIntPrices = () => {};
try {
    const content = await fs.readFile(PATH_DB, "utf-8");
    const contentParse = JSON.parse(content);
    const result = contentParse.map(item => {
        return {...item, price: Math.round(Number(item.price))};
    });

    await fs.writeFile(PATH_DB, JSON.stringify(result, null, 2), "utf-8");
} catch (error) {
    console.log(error);
}
convertToIntPrices();
