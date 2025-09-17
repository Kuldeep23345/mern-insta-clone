import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    return res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.log("Error in send message", error);
    return res.status(500).json({
      message: "Internal server error in send message",
      success: false,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      return res.status(200).json({ success: true, messages: [] });
    }
    return res
      .status(200)
      .json({ success: true, messages: conversation?.messages });
  } catch (error) {
    console.log("Error in get message", error);
    return res.status(500).json({
      message: "Internal server error in get message",
      success: false,
    });
  }
};

export { sendMessage ,getMessage};
