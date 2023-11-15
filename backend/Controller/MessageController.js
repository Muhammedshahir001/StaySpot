const MessageModel = require('../Model/MessageModel')

module.exports.addMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body
    const message = new MessageModel({
        chatId, senderId, text
    })
    console.log(message, "you are good")
    try {
        const result = await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)

    }
}
module.exports.getMessage = async (req, res) => {
    // console.log(req.params.chatId, "chat id...")
    const {chatId}=req.params;
    try {

        const result = await MessageModel.find({ chatId })
        console.log(result, "getting message")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)

    }
}

module.exports.adMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body
    const message = new MessageModel({
        chatId, senderId, text
    })
    console.log(message, "you are good")
    try {
        const result = await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)

    }
}
module.exports.getMessag = async (req, res) => {
    // console.log(req.params.chatId, "chat id...")
    const {chatId}=req.params;
    try {

        const result = await MessageModel.find({ chatId })
        console.log(result, "getting message")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)

    }
}