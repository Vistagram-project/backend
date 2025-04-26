import User from "../models/userSchema.js"
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
