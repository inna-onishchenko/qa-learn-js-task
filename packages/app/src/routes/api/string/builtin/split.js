const { Router } = require("express");

const router = Router();

router.post("/split", (req, res) => {
    const str = req.body.str;
    const separator = req.body.separator;
    if (typeof(str) !== "string" || typeof(separator) !== "string") {
        let result = "Invalid input parameters";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: result });
    } else {
        let result = str.split(separator);
        res.json({ status: "ok", language: "javascript", message: result });
    }
});

module.exports = router;

// http://localhost:3000/api/string/builtin/split