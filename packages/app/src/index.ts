import express from "express";
import path from "path";
import healthJsRoute from "./routes/health-js";
import healthTsRoute from "./routes/health-ts";
import manualStringJsRoute from "./routes/api/string/manual/split";
import builtinStringJsRoute from "./routes/api/string/builtin/split";


import manualStringJsTrim from "./routes/api/string/manual/trim";
import builtinStringJsTrim from "./routes/api/string/builtin/trim";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// --- Routes ---
// Students: register your route files here.
// JS example:
//   import stringRoutes from "./routes/string";
//   app.use("/api/string/manual", stringRoutes);
// TS example:
//   import stringRoutes from "./routes/string";
//   app.use("/api/string/builtin", stringRoutes);

app.use("/api/health-js", healthJsRoute);
app.use("/api/health-ts", healthTsRoute);
app.use("/api/string/manual", manualStringJsRoute);
app.use("/api/string/builtin", builtinStringJsRoute);


app.use("/api/string/manual", manualStringJsTrim);
app.use("/api/string/builtin", builtinStringJsTrim);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
