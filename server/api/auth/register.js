import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { collection } from "../../db/index.js";

export async function register(req, res){
    try {
        if (!req.body.username || !req.body.password || !req.body.email) return res.send(JSON.stringify({ error: "Missing required fields." }));
        if (!validator.isEmail(req.body.email)) return res.send(JSON.stringify({ error: "Invalid email." }));
        if (!validator.isAlpha(req.body.username, "en-US")) return res.send(JSON.stringify({ error: "Invalid username." }));
        if (req.body.password.length < 8) return res.send(JSON.stringify({ error: "Invalid password length." }));

        let saltPass = bcrypt.genSaltSync(10);
        let hashPass = bcrypt.hashSync(req.body.password, saltPass);

        let doc = {
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        };

        const result = await collection.userinfo.insertOne(doc);

        let userId = result.insertedId.toString();

        const session_token = jwt.sign({userId: userId}, process.env.JWT_SESSION_SECRET || '', { expiresIn: '15d' });
        const days = 15 * 24 * 60 * 60 * 1000;
    
        res.cookie('session', session_token, { maxAge: days });

        if(result.acknowledged){
            return res.send(JSON.stringify({ success: "Registered!" }));
        }
        else{
            return res.send(JSON.stringify({ error: "Something went wrong!" }));
        }
    } catch (error) {
        console.log(`ERROR (/api/auth/register): ${error}`);
        return res.send(JSON.stringify({error: "Something went wrong!"}));
    }
}