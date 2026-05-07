const e = require("express");
const { Router } = require("express");

const router = Router();

router.post("/includes", (req, res) => {
    const str = req.body.str;
    const search = req.body.search;
    let result = false;
    let index = -1;
    let indexes = [];
    if (typeof(str) !== "string") {
        let result = "Str should be a string";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: result });
    } else if (typeof(search) !== "string" || search.length > str.length || (str.length === 1 && search.length === 1 && str !== search)) {
        res.json({ status: "ok", language: "javascript", message: {result: result, index: index} });
    } else if (search.length === 0 || search === str) {
        result = true;
        index = 0;
        res.json({ status: "ok", language: "javascript", message: {result: result, index: index} });
    } else if (str.length >= 1) {
        for (let i = 0; i < str.length; i++) {
            let strHasSearch = true;
            for (let j = 0; j < search.length; j++) {
                if (str[i + j] !== search[j]) {
                    strHasSearch = false;
                    break;
                }
            }
            if (strHasSearch) {
                index = i;
                result = true;
                break;
            }
        }
        res.json({ status: "ok", language: "javascript", message: {result: result, index: index} });
    }
}
);

module.exports = router;

// http://localhost:3000/api/string/manual/includes