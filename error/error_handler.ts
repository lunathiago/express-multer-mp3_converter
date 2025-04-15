import{type Response,type Request,type NextFunction} from 'express';

export default function error_handler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.error(err.stack);
    res.status(500).json({message:err.message});
};
