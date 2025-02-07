import {Router} from "express";
import { metadata,download } from "../controllers/files.ts";

export const files:Router = Router();

files.get('/:filename',metadata);
files.get('/download/:filename',download);
