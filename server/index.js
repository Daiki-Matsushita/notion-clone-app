const express = require("express");
const mongoose = require("mongoose");

const PORT = 5000;
require("dotenv").config();

const app = express();
// jsonオブジェクトとして扱う
app.use(express.json());
// エンドポイント（例えば新規登録のregisterなどのAPI）を呼ぶために
// デフォルトでapi/v1/routesってつけないとダメよ
app.use("/api/v1", require("./src/v1/routes/auth"));

// DBconnection
try {
  // ■1
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中...");
} catch (e) {
  console.log(e);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中");
});

//http://localhost:5000/
app.get("/", (req, res) => {
  res.send("Helooooooo");
});

// ユーザログイン用API
