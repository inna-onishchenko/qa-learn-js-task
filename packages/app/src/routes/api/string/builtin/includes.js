const { Router } = require("express");

const router = Router();

router.post("/includes", (req, res) => {
    const str = req.body.str;
    const search = req.body.search;
    if (typeof(str) !== "string") {
        let result = "Str should be a string";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: result });
    } else {
        let result = str.includes(search);
        let index = str.indexOf(search);
        res.json({ status: "ok", language: "javascript", message: {result: result, index: index} });
    }
});

module.exports = router;

// http://localhost:3000/api/string/builtin/includes