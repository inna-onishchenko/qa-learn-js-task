import express from "express";
import path from "path";
import healthJsRoute from "./routes/health-js";
import healthTsRoute from "./routes/health-ts";
import manualStringJsSplit from "./routes/api/string/manual/split";
import builtinStringJsSplit from "./routes/api/string/builtin/split";
import manualStringJsRepeat from "./routes/api/string/manual/repeat";
import builtinStringJsRepeat from "./routes/api/string/builtin/repeat";

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
app.use("/api/string/manual", manualStringJsSplit);
app.use("/api/string/builtin", builtinStringJsSplit);
app.use("/api/string/manual", manualStringJsRepeat);
app.use("/api/string/builtin", builtinStringJsRepeat);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
