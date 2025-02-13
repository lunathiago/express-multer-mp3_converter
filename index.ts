import express,{type Application} from 'express';
import {error_handler} from './error/error_handler.ts';
import {upload_file} from './route/upload.ts'; 

const app:Application = express();
app.use(express.json());

const port:number = 3000;


app.use('/upload',upload_file);
app.use(error_handler);

const start = async()=>{
    try {
        app.listen(port,()=>console.log('Server ON'));
    } catch (error) {
        console.log(error);
    }
}

start();