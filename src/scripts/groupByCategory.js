import {PATH_DB} from "../constants/path.js";
import fs from "node:fs/promises";

const groupByCategory = async () => {
    const products = await fs.readFile(PATH_DB, "UTF-8");
    const parsedProducts = JSON.parse(products);
    const categories = parsedProducts.map(product => product.category);
    //   const filteredCategories = categories.filter((category, index, array) => {
    //     return array.indexOf(category) === index;
    //   });

    // на уроці
    // const result = {};
    //   categories.forEach((category) => {
    //     result[category] = [];
    //     parsedProducts.forEach((product) => {
    //       if (category === product.category) {
    //         result[category].push(product);
    //       }
    //     });
    //   });
    // кінець на уроці

    // опрацювали самостійно
    // const result = {};
    // parsedProducts.forEach(product => {
    //     if (!result[product.category]) {
    //         result[product.category] = [];
    //     }
    //     result[product.category].push(product);
    // });
    // console.log(result);
    // кінець опрацювали самостійно

    // чат жипити
    const result = parsedProducts.reduce((acc, product) => {
        (acc[product.category] = acc[product.category] || []).push(product);
        return acc;
    }, {});

    console.log(result);
    // кінець чат жипити
};

groupByCategory();
