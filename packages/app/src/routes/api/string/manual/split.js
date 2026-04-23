const { Router } = require("express");

const router = Router();

router.post("/split", (req, res) => {
    const str = req.body.str;
    const separator = req.body.separator;
    let current = "";
    let result = [];
    if (typeof(str) !== "string" || typeof(separator) !== "string") {
        let result = "Invalid input parameters";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: result });
    } else if (str === current && separator === current) {
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (str !== current && separator === current) {
        result.push(str);
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (str === current && separator !== current) {
        result.push(emptyStr);
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (str !== current && separator !== current) {
        let i = 0;
        while (i < str.length) {
            let strIsNotSeparator = true;
            for (let j = 0; j < separator.length; j++) {
                if (str[i + j] !== separator[j]) {
                    strIsNotSeparator = false;
                    break;
                }
            }
            if (strIsNotSeparator) {
                result.push(current);
                current = "";
                i += separator.length;
             } else {
                current += str[i];
                i++;
            }
    }
        result.push(current);
        res.json({ status: "ok", language: "javascript", message: result });
    }
}
);

module.exports = router;

// http://localhost:3000/api/string/manual/split