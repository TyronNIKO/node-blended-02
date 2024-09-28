import path from "node:path";
import { PATH_FOLDER } from "../constants/path.js";
import fs from "node:fs/promises";

const getFilesInfo = async () => {
  const fileNames = await fs.readdir(PATH_FOLDER);
  for (const fileName of fileNames) {
    const pathTo = path.join(PATH_FOLDER, fileName);
    const fileData = await fs.stat(pathTo);
    console.log({ name: fileName, size: fileData.size });
  }
};
getFilesInfo();
