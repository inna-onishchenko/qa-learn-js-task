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
        return;
    } else if (count < 0) {
        resultMessage = "Count should be a non-negative integer";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: resultMessage });
        return;
    } else if (count > 0 && typeof(strRepeat) === "string" && strRepeat.length > 0) {
        for (let i = 0; i < count; i++) {
            resultRepeat += strRepeat;
        }
        res.json({ status: "ok", language: "javascript", message: resultRepeat });
    } else {
        res.json({ status: "ok", language: "javascript", message: resultRepeat });
    }
}
);

module.exports = router;

// http://localhost:3000/api/string/manual/repeat