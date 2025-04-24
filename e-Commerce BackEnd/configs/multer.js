

import multer from "multer";

export const upload = multer({storage: multer.diskStorage({})}); // Use memory storage to store the file in memory