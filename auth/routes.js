import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
});

router.get("/error", (req, res) => res.send("Unknown Error"));
router.get(
    "/login/github",
    passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
    "/login/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth/error" }),
    function (req, res) {
        res.redirect("/");
    }
);