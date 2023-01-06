import express from "express";
import cookieParser from "cookie-parser";

import { isLoggedIn } from "./auth/helpers.js";
import { initializeStrategies } from "./auth/passport.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { authRouter } from "./auth/routes.js";
import { adminRouter } from "./routes/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// auth setup
initializeStrategies(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/", isLoggedIn, (req, res) => {
    res.render("index", { user: req.user });
});

app.listen(3000, () => {
    console.log("🚀 Tá rolando: porta 3000");
});
