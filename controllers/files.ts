import { type Request,type Response,type NextFunction } from "express";
import { gridFSBucket } from "../db_config/config.ts";
import { app_error } from "../error_handler/error_handler.ts";

interface file_param{
    filename:string;
}

export const metadata = async(req:Request<file_param>,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const files = await gridFSBucket.find({filename:req.params.filename}).toArray();
        if(!files||files.length){
            throw new app_error('file not found',404);
        }
        res.json(files[0]);
    } catch (error) {
        next(error);
    }
};

export const download = async(req:Request<file_param>,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const files = await gridFSBucket.find({filename:req.params.filename}).toArray();
        if(!files||files.length){
            throw new app_error('file not found',404);
        }
        const read_stream = gridFSBucket.openDownloadStreamByName(req.params.filename);
        read_stream.pipe(res);
    } catch (error) {
        next(error);
    }
};