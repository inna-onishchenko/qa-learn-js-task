const { Router } = require("express");

const router = Router();

router.post("/repeat", (req, res) => {
    const strRepeat = req.body.str;
    const count = req.body.count;
    let resultRepeat = "";
    let resultMessage = "";
        if (typeof strRepeat !== "string") {
        resultMessage = "Text to repeat should be a string";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: resultMessage });
    } else if (count < 0) {
        resultMessage = "Count should be a non-negative integer";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: resultMessage });
    } else {
        resultRepeat = strRepeat.repeat(count);
        res.json({ status: "ok", language: "javascript", message: resultRepeat });
    }
});

module.exports = router;

// http://localhost:3000/api/string/builtin/repeat