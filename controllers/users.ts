import { type Response,type Request,type NextFunction } from "express";
import {User,type IUser} from '../models/user.ts';
import {app_error} from '../error_handler/error_handler.ts';

interface query_params{
    page:string;
    limit:string;
}

export const get = async(req:Request<{},{},{},query_params>,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const page:number = Number(req.query.page)>0 ? parseInt(req.query.page,10):1;
        const limit:number = Number(req.query.limit)>0 ? parseInt(req.query.limit,10):10;
        
        const skip:number = (page-1)*limit;
        const users:IUser[] = await User.find().skip(skip).limit(limit);
        const total:number = await User.countDocuments();
        res.status(200).json({
            page,limit,total,totalPages:Math.ceil(total/limit),data:users
        })
    } catch (error) {
        next(error);
    }
};

interface body_params{
    name:string;
    email:string;
}
export const post = async(req:Request<{},{},body_params>,res:Response,next:NextFunction)=>{
    try {
        const{name,email} = req.body;
        if(!name||!email){
            throw new app_error('name or email missing',400)
        }
        const user = await User.create({name,email});
        res.status(201).json(user)
    } catch (error) {
        next(error);
    }
};