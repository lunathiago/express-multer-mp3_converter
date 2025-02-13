import { type Response } from "express";
import ffmpeg,{type FfmpegCommandOptions} from 'fluent-ffmpeg';
import { Readable } from 'stream';

export const convert_to_mp3 = (input:Readable,res:Response):Promise<void>=>{

    return new Promise((resolve,reject)=>{
        res.setHeader("Content-Disposition", 'attachment; filename="output.mp3"');
        res.setHeader("Content-Type", "audio/mpeg");
        ffmpeg(input)
        .toFormat("mp3")
        .on('error',(error:unknown)=>{
            reject(error)
        }).on('end',()=>{
            resolve();
        }).pipe(res);

    })
};