import express from "express";

import { isLoggedIn } from "./auth/helpers.js";
import { initializeStrategies } from "./auth/passport.js";

const app = express();
initializeStrategies(app);

app.get("/", isLoggedIn, (req, res) => {
    res.send(`Hello world ${req.user.displayName}`);
});

app.listen(3000, () => {
    console.log("Server is up and running at the port 3000");
});
