import {PATH_DB} from "../constants/path.js";
import fs from "node:fs/promises";

const getTotalPrice = async () => {
    try {
        const content = await fs.readFile(PATH_DB, "utf-8");
        const contentParse = JSON.parse(content);
        const result = contentParse.reduce((acc, item) => {
            return Number(item.price) + acc;
        }, 0);
        console.log(result.toFixed(2));
    } catch (error) {
        console.log(error);
    }
};
getTotalPrice();
