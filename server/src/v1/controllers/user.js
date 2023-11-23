const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const User = require("../models/user");
require("dotenv").config();

// ユーザ登録API
exports.register = async (req, res) => {
  // パスワードの受け取り
  const password = req.body.password;

  try {
    // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザ新規作成
    const user = await User.create(req.body);
    // JWT発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24",
    });
    return res.status(200).json({ user, token });
  } catch (e) {
    return res.status(500).json(e);
  }
};

// ユーザログインAPI
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // DBからユーザが存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({
        errors: {
          param: "username",
          message: "ユーザー名が無効です",
        },
      });
    }

    // パスワードがあっているか照合する
    const decryptedPW = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8); // ドキュメントを見ながら実装するべし

    if (decryptedPW !== password) {
      res.status(401).json({
        errors: {
          param: "password",
          message: "PWが無効です",
        },
      });
    }
    // JWTを発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json(e);
  }
};
