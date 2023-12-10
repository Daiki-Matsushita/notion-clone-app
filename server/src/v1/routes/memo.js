const router = require("express").Router();

const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成するためのルーティング作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザが投稿したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAllMemo);

// ログインしているユーザが投稿したメモを一つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// ログインしているユーザが投稿したメモを一つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// ログインしているユーザが投稿したメモを一つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;
