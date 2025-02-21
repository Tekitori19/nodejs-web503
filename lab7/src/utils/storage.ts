import multer from "multer"
import { MIME_TYPE_MAP } from "../types/image.js";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];

        let error: Error | null = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
