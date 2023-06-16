import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DEFAULT_UPLOAD_PATH = join(__dirname, "../../uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DEFAULT_UPLOAD_PATH);
  },
});
export const upload = multer({ storage: storage });
