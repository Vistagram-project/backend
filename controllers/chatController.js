import User from "../models/userSchema.js"
import chatModel from "../models/chatModel.js";
export const getAllUsers = async (req , res)=>{
    try {
        let users = await User.find({_id: {$nin:[req.user._id]}});
        if(!users){
            return res.status(400).json({
                success: false,
                message: "No users found"
            })
        }
        res.status(200).json({ success: true, users });

    } catch (error) {
        console.log(error.message);
    }
}


// Save a new chat message
export const saveMessageService = async ({ senderId, receiverId, message }) => {
    try {
        console.log("sender =>", senderId + " "  , "recever => ", receiverId + " ", "msg => ", message)
      const newMessage = new chatModel({
        senderId,
        receiverId,
        message,
      });
  
      const savedMessage = await newMessage.save();
      console.log("✅ Message saved in DB:", savedMessage);
      return savedMessage;
    } catch (error) {
      console.error("❌ Error saving message:", error);
      throw error;
    }
  };

export const messageHistory = async(req , res)=>{
    const { userId, otherUserId } = req.params;     
    try {
        const messages = await chatModel.find({
            $or: [
              { senderId: userId, receiverId: otherUserId },
              { senderId: otherUserId, receiverId: userId }
            ]
          }).sort({ createdAt: 1 });
        res.status(200).json({sucess:true , messages});
        
    } catch (error) {
        console.error("❌ Error fetching chat history:", error);
        res.status(500).json({ message: 'Failed to fetch chat history' });
    }
};
