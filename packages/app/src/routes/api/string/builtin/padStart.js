const { Router } = require("express");

const router = Router();

router.post("/padStart", (req, res) => {
  const str = req.body.str;
  const length = req.body.length;
  const fill = req.body.fill;
  let result = "";
  if (typeof str !== "string") {
    result = "Str should be a string";
    res.statusCode = 400;
    res.json({ status: "bad_request", language: "javascript", message: result });
  } else {
    result = str.padStart(length, fill);
    res.json({ status: "ok", language: "javascript", message: result });
  }
});

module.exports = router;

// http://localhost:3000/api/string/builtin/padStart
