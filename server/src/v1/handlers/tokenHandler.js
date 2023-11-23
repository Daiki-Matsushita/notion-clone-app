const JWT = require("jsonwebtoken");
const User = require("../models/user");

// JWT認証を検証するためのミドルウェア（トークン版バリデーションチェック）
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // そのJWTと一致するユーザを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  // ヘッダーのauth~~からBHを取得。
  const bearerHeader = req.headers["authorization"];

  // HBがないとfalse
  if (bearerHeader) {
    // その中でも2番目にあるのが、必要なbearer
    const bearer = bearerHeader.split(" ")[1];
    try {
      // 秘密鍵でデコードする。そしてそれを返す。
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
};
