import { Request, Response, NextFunction } from 'express';
import { EVENT_FIELDS, upload, UPLOAD_IMAGES_CONSTANTS } from '@/utils';

/**
 * NOTE: This middleware is designed for specific routes and is not a global middleware.
 * It is used to upload an image for an event.
 * And add the image url to the request body in the `imageUrl` field.
 */
export const uploadEventImage = (req: Request, res: Response, next: NextFunction) => {
  const uploadSingle = upload.single(UPLOAD_IMAGES_CONSTANTS.IMAGE_FIELD_NAME);

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      if (req.body[UPLOAD_IMAGES_CONSTANTS.DATA_FIELD_NAME]) {
        const parsedData = JSON.parse(req.body[UPLOAD_IMAGES_CONSTANTS.DATA_FIELD_NAME]);
        req.body = {
          ...parsedData
        };
        delete req.body[UPLOAD_IMAGES_CONSTANTS.DATA_FIELD_NAME];
      }

      if (req.file) {
        req.body[EVENT_FIELDS.IMAGE_URL] = `${UPLOAD_IMAGES_CONSTANTS.IMAGE_PATH}${req.file.filename}`;
      } else {
        req.body[EVENT_FIELDS.IMAGE_URL] = undefined;
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: 'Invalid JSON data in the data field'
      });
    }
  });
};
