import express,{type Application} from 'express';
import error_handler from './error/error_handler.js';
import {upload_file} from './route/upload'; 

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
