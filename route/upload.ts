import { Router } from "express";
import { upload_youtube, upload_files } from '../controllers/upload.js';
import multer from 'multer';

const mem_storage = multer.memoryStorage();
const upload = multer({storage:mem_storage});

export const upload_file:Router=Router();

upload_file.post('/file',upload.single('file'),upload_files);
upload_file.post('/youtube',upload_youtube);
