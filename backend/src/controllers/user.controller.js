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
    const existedUser = await User.findOne({
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
  } catch (error) {
    console.log("Error in register user", error);
    return res.status(500).json({
      message: "Internal server error in register user",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "All fields are required either email or username",
        success: false,
      });
    }
    const existedUsers = await User.findOne({ $nor: [{ email, username }] });

    if (!existedUsers) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = existedUsers.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await existedUsers.generateAccessToken();

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(400)
      .json({ message: "Login successfully", success: true, existedUsers });
  } catch (error) {
    console.log("Error in login user", error);
    return res.status(500).json({
      message: "Internal server error in login user",
      success: false,
    });
  }
};

const logoutUser = async (_, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log('error in logout ',error)
    return res
      .status(500)
      .json({ message: "Logout failed", success: false});
  }
};

export { registerUser, loginUser, logoutUser };
