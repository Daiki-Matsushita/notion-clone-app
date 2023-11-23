const { validationResult } = require("express-validator");
exports.validate = (req, res, next) => {
    // 上でvalidationチェックした内容をreqで受け取り、一つも引っかかっていないならnext
    const e = validationResult(req);
    if(!e.isEmpty()){
        return res.status(400).json({errors: e.array() })
      }
      next(); // このnextで async (req, res) => { のユーザ新規作成処理が走る
  }