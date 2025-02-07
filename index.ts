import express,{type Application,type Response,type Request} from 'express';
import {router} from './routes/user.ts';
import {error_handler} from './error_handler/error_handler.ts';
import {connect_db} from './db_config/config.ts';
import { up } from './routes/upload.ts';
import { files } from './routes/files.ts';


const app:Application = express();

app.use(express.json());
app.use('/users',router);
app.use('/upload',up);
app.use('/',files);


app.use(error_handler);
const start= async()=>{
    try {
        await connect_db();
        app.listen(3000,()=>console.log('server is on'));
    } catch (error) {
        console.log(error)
    }
}

start();