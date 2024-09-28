import {PATH_DB} from "../constants/path.js";
import fs from "node:fs/promises";

const getProductsByCategory = async category => {
    try {
        const content = await fs.readFile(PATH_DB, "utf-8");
        const contentParse = JSON.parse(content);
        const result = contentParse.filter(item => item.category.toLowerCase() === category.toLowerCase().trim());
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

getProductsByCategory("Outdoors");
