import User from "../models/user.model.js";

export const authCallback = async(_req, res) => {
    try{
        const {id, firstName, lastName, imageUrl} = _req.body;

        //check if user exists
        const user = await User.findOne({clerkId: id});
        if(!user){
            //signup user
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            });
        }
        res.status(200).json({success: true});
    }catch(err){
        console.error("Error in auth callback", err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}