import { type Request,type Response,type NextFunction } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import {convert_youtube_to_mp3} from '../utils/convert_youtube_to_mp3.js';
import {download_video} from '../utils/download_video.js';
import {convert_to_mp3} from '../utils/convert_to_mp3.js';
import { Readable } from 'stream';
import ytdl from '@distube/ytdl-core';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const upload_youtube = async(req:Request,res:Response,next:NextFunction)=>{
    const {youtube_link} = req.body;
    console.log(youtube_link)
    if(!youtube_link){
        res.status(400).json({message:'youtube link missing'});
        return;
    }
    try {

        const info = await ytdl.getInfo(youtube_link);
        const title = info.videoDetails.title.replace(/[<>:"/\\|?*]/g, "");
        const fileName =`controllers/files/${title}.mp4`;

        await download_video(youtube_link,fileName);
        const file_in = path.join(__dirname, `files/${title}.mp4`);
        const file_out = path.join(__dirname, `mp3/${title}.mp3`);
        await convert_youtube_to_mp3(file_in,file_out);

        res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
        res.setHeader('Content-Type', 'audio/mpeg');
        const write_stream = fs.createReadStream(file_out);
        write_stream.pipe(res);
        write_stream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).json({ message: 'Error streaming the file' });
        });
        
    } catch (error) {
        next(error);
    }
};

export const upload_files = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(!req.file){
        res.status(400).json({message:'no file uploaded'});
        return;
    }
    
    try {
        const the_stream_file = Readable.from(req.file.buffer);
        await convert_to_mp3(the_stream_file,res);
        res.status(201).json({message:'converted successfully'});
    } catch (error) {
        console.error(error);
        next(error)
    }
}
