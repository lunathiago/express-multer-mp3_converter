import ffmpeg,{type FfmpegCommandOptions} from 'fluent-ffmpeg';

export const convert_youtube_to_mp3 = (input:string,output:string):Promise<void>=>{
    return new Promise((resolve,reject)=>{
        ffmpeg(input)
        .toFormat("mp3")
        .on("error", (error) => {
            console.error("FFmpeg Error:", error);
            reject(error);
        })
        .on("end", () => {
            console.log("MP3 conversion completed");
            resolve();
        })
        .save(output);
    })
}
