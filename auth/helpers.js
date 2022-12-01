export const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.send(`<a href="/login/github">Clique aqui para fazer login</a>`);
    }
};
