import verifyToken from "./lib/jwt.js";


export async function cookieValidator(req, res, next) {
    try {
        if(req.path.startsWith('/api/dashboard')) {
            await verifyToken(req.cookies.session, process.env.JWT_SESSION_SECRET);
        }
        if(req.path == "/"){
            await verifyToken(req.cookies.session, process.env.JWT_SESSION_SECRET);
        }
        next();
    } catch {
        res.redirect('/login');
    }
}