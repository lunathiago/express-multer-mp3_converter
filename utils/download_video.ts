import ytdl from '@distube/ytdl-core';
import fs from 'fs';

export const download_video = async(url:string,output:string):Promise<void>=>{
    try {
        return new Promise((resolve,reject)=>{
            ytdl(url,{ filter: 'audioonly', quality: 'highestaudio'}).pipe(fs.createWriteStream(output))
            .on('finish',()=>{
                console.log('download completed');
                resolve();
            })
            .on('error',(error)=>{
                console.log(error)
                reject(error);
            });
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
} 