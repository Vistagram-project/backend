import User from "../models/userSchema.js"
export const getAllUsers = async (req , res)=>{
    try {
        let users = await User.find({_id: {$nin:[req.user._id]}});
        res.status(200).json({ users });

    } catch (error) {
        console.log(error.message);
    }
}
