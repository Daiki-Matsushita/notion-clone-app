const router = require("express").Router();

const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成するためのルーティング作成
router.post("/", tokenHandler.verifyToken, memoController.create);

module.exports = router;
