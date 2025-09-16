import { User } from "../models/user.model.js";
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const existedUser = User.findOne({
      $or: [
        {
          username,
          email,
        },
      ],
    });
    if (existedUser) {
      return res
        .status(409)
        .json({ message: "email/username is already existed", success: false });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User registerd successfully", success: true, newUser });
  } catch (error) {}
};
