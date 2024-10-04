import multer from 'multer';
import path from 'path';
import config from './config/config.js';

// Define multer diskStorage configuration
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.upload_dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
