import {Router} from 'express';
import multer from "multer";
import {upload_file} from '../controllers/upload.ts';

const storage = multer.memoryStorage();
const upload = multer({storage});

export const up:Router =  Router();
up.post('/',upload.single('file'),upload_file);