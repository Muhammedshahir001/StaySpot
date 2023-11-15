const ChatModel = require("../Model/ChatModel");
module.exports.createChat = async (req, res) => {
    try {
        const existChat = await ChatModel.findOne({
            members: [req.body.senderId, req.body.receiverId],
        });
        // console.log(existChat, "popopopoo")
        if (existChat) {
            res.status(200).json({ success: true });
        } else {
            const newChat = new ChatModel({
                members: [req.body.senderId, req.body.receiverId],
            });
            // console.log(newChat, "hihih");
            const result = await newChat.save();
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
module.exports.UserChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] },
        });
        // console.log(chat,"iiii")
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};
module.exports.findChat = async (req, res) => {
    console.log("find chat working....    ");
    try {
        console.log("4444");
        // console.log(req.params.firstId, "sender id");
        // console.log(req.params.secondId, "receriver id");
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        // console.log(chat, "909090");
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};
module.exports.StaffChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.staffId] },
        });
        // console.log(chat, "iiii")
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};
module.exports.findstaffchat = async (req, res) => {
    // console.log("finding...")
    try {
        const staffChat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        // console.log(staffChat, "stagggg")
        res.status(200).json(staffChat)
    } catch (error) {
        res.status(500).json(error)

    }
}