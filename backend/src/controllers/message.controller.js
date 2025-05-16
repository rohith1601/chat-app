import Message from '../models/message.model.js';

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId= req.user._id;
        const filteredUserIds=await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json({
            users: filteredUserIds
        });
    }
    catch(err){
        console.log("Error in getUsersForSidebar", err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const getMesseges = async (req, res) => {
    try{
        const { id } = req.params;
        const myId= req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: id },
                { senderId: id, receiverId: myId }
            ]
        });
        
        res.status(200).json({
            messages
        });
    }
    catch(err){
        console.log("Error in getMesseges", err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export const sendMessage = async (req, res) => {
    try{
        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId= req.user._id;

        let imageUrl;
        if (image) {
           const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

            const newMessage = new Message({
                senderId,
                receiverId,
                text,
                image: imageUrl
            });
            await newMessage.save();

            //soket.io code

            res.status(200).json({
                message: 'Message sent successfully',
                newMessage
            });

            
    }
    catch(err){
        console.log("Error in sendMessage", err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


