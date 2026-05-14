const { Router } = require("express");

const router = Router();

router.post("/trim", (req, res) => {
  const str = req.body.str;
  if (typeof str !== "string") {
    const result = "Input parameter is not a string";
    res.statusCode = 400;
    res.json({ status: "bad_request", language: "javascript", message: result });
  } else {
    const result = str.trim();
    res.json({ status: "ok", language: "javascript", message: result });
  }
});

module.exports = router;

// http://localhost:3000/api/string/builtin/trim
