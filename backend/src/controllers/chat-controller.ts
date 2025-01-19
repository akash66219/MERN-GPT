import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { chatOptions } from "../utils/openai-config.js";
import { G4F } from "g4f";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const g4f = new G4F()
    const user = await User.findById(res.locals.jwtData.id)
    if (!user){
      return res.status(401).json({ msg: "User does not exists with this email."})
    }

    const chats = user.chats.map(({ role, content }) => ({ role,content})) 
    
    chats.push({ content: message, role: "user" });
    // @ts-ignore
    user.chats.push({ role: "user",content: message })

    const chatResponse = await g4f.chatCompletion(chats,chatOptions);
    // @ts-ignore
    user.chats.push({role:"assistant", content : chatResponse});
    await user.save();
    return res.status(200).send({ response : chatResponse })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" })
  }
};

export const deleteChat = async(req : Request, res : Response) => {
  try{
      let userId = res.locals.jwtData.id;
      let user = await User.findById(userId)
      if(!user){
          return res.status(401).send("Invalid Token.")
      }
      if(user._id.toString() !== res.locals.jwtData.id) {
          return res.status(401).send("Unauthorized Access.")
      }
      user.chats=[]
      await user.save()
      return res.status(200).json({msg : "Chats deleted successfully!"})
      
  }catch(err){
      return res.status(500).send("Internal server error")
  }
}