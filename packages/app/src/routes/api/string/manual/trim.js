const { Router } = require("express");

const router = Router();

router.post("/trim", (req, res) => {
    const str = req.body.str;
    let result = "";
    let startStr = "";
    let endStr = "";
    if (typeof(str) !== "string") {
        let result = "Input parameter is not a string";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: result });
    } else if (str === result) {
        res.json({ status: "ok", language: "javascript", message: result });
    } else {
        let i = 0;
        while (i < str.length) {
            if (str[i] !== " ") {
                startStr = i;
                for (let j = str.length - 1; j >= 0; j--) {
                    if (str[j] !== " ") {
                        endStr = j;
                        break;
                    }
                }
                break;
            } else {
                i++;
            }
    }
        if (startStr === "" && endStr === "") {
            result = "";
        } else {
            for (let k = startStr; k <= endStr; k++) {
                result += str[k];
            }
        }
        res.json({ status: "ok", language: "javascript", message: result });
    }
}
);

module.exports = router;

// http://localhost:3000/api/string/manual/trim