const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Check username
    const username = req.body.username;
    const oldUser = await User.findOne({ username: username });
    if (oldUser) {
      return res.status(201).json({
        message: "Tài khoản đã tồn tại.",
      });
    }
    // Hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = await new User({
      username: username,
      password: passwordHashed,
    });
    const user = await newUser.save();
    // Ẩn password
    user.password = undefined;
    res.status(200).json({
      user,
      message: "Đăng ký thành công.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    // Check username
    const username = req.body.username;
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "Incorrect username.",
      });
    }
    // Check password
    const password = req.body.password;
    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      return res.status(404).json({
        message: "Incorrect password.",
      });
    }
    // accessToken ngắn hạn
    const accessToken = await jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRWS_IN }
    );
    // refreshToken dài hạn
    const refreshToken = await jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRWS_IN }
    );
    // lưu refreshToken vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //true
      path: "/",
      sameSite: "strict",
    });
    // Ẩn password
    user.password = undefined;
    res.status(200).json({
      user,
      accessToken,
      refreshToken,
      message: "Đăng nhập thành công.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.refresh = async (req, res) => {
  try {
    // lấy refreshToken từ cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({
        message: "Bạn chưa đăng nhập.",
      });
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, user) => {
        if (err) {
          console.log(err);
        }
        // Tạo accessToken,refreshToken mới
        const newAccessToken = await jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: process.env.JWT_ACCESS_EXPIRWS_IN }
        );
        const newRefreshToken = await jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_REFRESH_SECRET,
          { expiresIn: process.env.JWT_REFRESH_EXPIRWS_IN }
        );
        // lưu newRefreshToken vào cookie
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false, //true
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          newAccessToken,
          refresh: "refresh thành công.",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "Đăng xuất thành công.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
