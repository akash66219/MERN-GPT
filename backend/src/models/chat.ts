import mongoose from "mongoose";

interface chatType {
    role: "user" | "assistant";
    content: string;
}


const chatSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

export default chatSchema

export {chatType}