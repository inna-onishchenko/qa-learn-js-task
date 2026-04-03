const { Router } = require("express");

const router = Router();

router.post("/split", (_req, res) => {
    let str = _req.body.str;
    let separator = _req.body.separator;
    const firstIndex = str[0];
    const lastIndex = str[str.length - 1];
    if (separator.length === 1 && separator !== " " && str.includes(separator) && (firstIndex !== separator && lastIndex !== separator)) {
        let result = str.split(separator);
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (separator.length !== 1) {
        let result = "Separator should be a single character";
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (separator === " ") {
        let result = "Separator should not be a space character";
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (!str.includes(separator)) {
        let result = "String should contain the separator";
        res.json({ status: "ok", language: "javascript", message: result });
    } else if (firstIndex === separator || lastIndex === separator) {
        let result = "String should not start or end with the separator";
        res.json({ status: "ok", language: "javascript", message: result });
    } else {
        let result = "Invalid input parameters";
        res.json({ status: "ok", language: "javascript", message: result });
    }
});

module.exports = router;

// http://localhost:3000/api/string/builtin/split