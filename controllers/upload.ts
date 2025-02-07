import { type Request,type Response,type NextFunction } from "express";
import {app_error} from '../error_handler/error_handler.ts'
import { gridFSBucket } from "../db_config/config.ts";


export const upload_file = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
   try {
       if(!req.file){
        throw new app_error("No file uploaded",400);
       }
       console.log('Uploading...');
       const uploadStream = gridFSBucket.openUploadStream(req.file.originalname,{contentType:req.file.mimetype});

       console.log('Uploaded!');
       uploadStream.on('finish',()=>{
           uploadStream.destroy()
           res.status(201).json({
               success:true,
               message:'File uploaded successfully',
               fileName:req.file?.originalname
            })
        });
        
        uploadStream.on("error",(err:any)=>{
            console.error("Upload error:", err);
            uploadStream.destroy();
            throw new app_error("File upload failed", 500);
        });
        uploadStream.end(req.file.buffer);
   } catch (error) {
        next(error);
   }
       
}