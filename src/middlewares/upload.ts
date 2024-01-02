import { Request } from 'express';
import multer  from 'multer';
import { AppError } from '../utils/helpers';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/dist/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  },
});

const fileFilter = function (req:Request, file:Express.Multer.File, cb:multer.FileFilterCallback) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else
    cb(new AppError(400,"fail",`The ${file.fieldname} must be either jpeg or png image`),false);
}

export const upload = multer({ storage, fileFilter });