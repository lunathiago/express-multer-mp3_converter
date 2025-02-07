import { app_error } from "../error_handler/error_handler.ts";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const mongodb = mongoose.mongo;  

const str = process.env.connection_string;
if (!str) {
    throw new app_error(" connection string missing", 500);
}

export let gridFSBucket: GridFSBucket;

export const connect_db = async () => {
    try {
        const connection = await mongoose.connect(str);
        console.log(" connected");

        const db = mongoose.connection.db;

        if (!db) {
            console.error(" connection is not initialized properly.");
            process.exit(1);
        }
  
        gridFSBucket = new mongodb.GridFSBucket(db, { bucketName: "uploads" });


    } catch (error) {
        console.error("connection error:", error);
        process.exit(1);
    }
};


mongoose.connection.on("error", (err) => {
    console.error("connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.error("disconnected");
});

mongoose.connection.on("reconnectFailed", () => {
    console.error(" failed to reconnect.");
});
