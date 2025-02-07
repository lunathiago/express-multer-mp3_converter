import mongoose,{Document,Schema} from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
}

const user_schema:Schema = new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true}
});

export const User = mongoose.model<IUser>("User",user_schema); 