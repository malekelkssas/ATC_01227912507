import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ensureUploadDir } from './ensureUploadDir';
import { UPLOAD_IMAGES_CONSTANTS } from '../constants';

ensureUploadDir(UPLOAD_IMAGES_CONSTANTS.IMAGE_PATH);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/events');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
        cb(null, `event-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and WebP images are allowed.'));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    }
  });