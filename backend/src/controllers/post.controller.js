import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
const addNewPost = async (req, res) => {
  try {
    const authorId = req.user._id;
    const { caption } = req.body;
    const image = req.file || null;

    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }
    const optimizedImage = await sharp(image.buffer, {
      create: {
        width: 800,
        height: 800,
      },
    })
      .jpeg()
      .toBuffer();

    const cloudResponse = await uploadOnCloudinary(optimizedImage);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res
      .status(201)
      .json({ message: "New post added", success: true, post });
  } catch (error) {
    console.log("Error in add new post ", error);
    return res.status(500).json({
      message: "Internal server error in add new post",
      success: false,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username , profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username,profilePicture",
        },
      });
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log("Error in get all post ", error);
    return res.status(500).json({
      message: "Internal server error in get all post",
      success: false,
    });
  }
};

const getUserPost = async (req, res) => {
  try {
    const authorId = req.user._id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username,profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username,profilePicture" },
      });

    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log("Error in get user post ", error);
    return res.status(500).json({
      message: "Internal server error in get user post",
      success: false,
    });
  }
};

export { addNewPost, getAllPost };
