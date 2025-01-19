import mongoose, { Document } from "mongoose";
import chatSchema, { chatType } from "./chat.js";

export interface SavedUser extends Document {
    name: string,
    email: string,
    password: string,
    chats: chatType[] | [] 
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema]
});

export default mongoose.model<SavedUser>("User", userSchema);
