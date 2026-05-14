const e = require("express");
const { Router } = require("express");

const router = Router();

router.post("/padStart", (req, res) => {
    const str = req.body.str;
    const length = req.body.length;
    const fill = req.body.fill;
    let result = "";
    if (typeof(str) !== "string") {
        result = "Str should be a string";
        res.statusCode = 400;
        res.json({ status: "bad_request", language: "javascript", message: result });
    } else if (str.length >= Number(length) || (typeof(fill) !== "undefined" && String(fill).length === 0) || isNaN(Number(length)) || (str.length === 0 && Number(length) === 0)) {
        res.json({ status: "ok", language: "javascript", message: str });
    } else {
        let fillNew = "";
        if (typeof(fill) === "undefined") {
            absentFill = " ";
            fillNew = increaseFill(absentFill);
            publishResult(str, fillNew);
        } else if (str.length + String(fill).length === Number(length)) {
            publishResult(str, fill);
        } else if (str.length + String(fill).length > Number(length)) {
            fillNew = cutFill(fill);
            publishResult(str, fillNew);
        } else if (str.length + String(fill).length < Number(length) || (str.length === 0 && String(fill).length > 0)) {
            fillNew = String(fill);
            fillNew = increaseFill(fillNew);
            fillNew = cutFill(fillNew);
            publishResult(str, fillNew);
        }

        function cutFill(fillToCut) {
            if (String(fillToCut).length + str.length > Number(length)) {
                fillNew = String(fillToCut);
                while (fillNew.length > Number(length) - str.length) {
                    let chars = fillNew.split("");
                    let lastChar = chars.pop();
                    fillNew = chars.join("");
                }
                return fillNew;
            }
            return fillToCut;
        }

        function increaseFill(fillToIncrease) {
            if (String(fillToIncrease).length + str.length < Number(length) || (str.length === 0 && String(fill).length > 0)) {
                let fillNew = String(fillToIncrease);
                while (fillNew.length + str.length < Number(length)) {
                    fillNew += fillNew;
                }
                return fillNew;
            }
            return fillToIncrease;
        }

        function publishResult(str, fill) {
            let result = String(fill) + str;
            res.json({ status: "ok", language: "javascript", message: result });
        }
    }
}
);

module.exports = router;

// http://localhost:3000/api/string/manual/padStart

