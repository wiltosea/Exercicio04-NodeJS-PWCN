import { Router } from "express";

export const adminRouter = Router();

adminRouter.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin", { user: req.session.passport.user });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
}
