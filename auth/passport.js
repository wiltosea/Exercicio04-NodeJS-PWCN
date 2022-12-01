import passport from "passport";
import cookieSession from "cookie-session";
import { Strategy as GithubStrategy } from "passport-github2";
import { urls } from "../constants.js";

export function initializeStrategies(app) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(
        new GithubStrategy(
            {
                clientID: "Iv1.548ff23fa6488557",
                clientSecret: "b653e39e57df1ee1fd9dfb1a324b55f61b4e7f84",
                callbackURL: `${urls.application}/auth/login/github/callback`,
            },
            function (accessToken, refreshToken, profile, done) {
                return done(null, profile);
            }
        )
    );

    app.use(
        cookieSession({
            name: "github-auth-session",
            keys: ["key1", "key2"],
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
}
