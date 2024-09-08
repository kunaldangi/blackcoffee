import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { collection } from "../../db/index.js";

export async function login(req, res) {
    try {
        if(!req.body.email || !req.body.password) return res.send(JSON.stringify({ error: "Missing required fields." }));
        if(!validator.isEmail(req.body.email)) return res.send(JSON.stringify({ error: "Invalid email." }));
        if(req.body.password.length < 8) return res.send(JSON.stringify({ error: "Invalid password length." }));
        
        let query = { email: req.body.email};
        const result = await collection.userinfo.findOne(query);
        
        if(!result?.password) return res.send(JSON.stringify({ error: "Invalid email or password." }));
        if(!bcrypt.compareSync(req.body.password, result?.password)) return res.send(JSON.stringify({error: "Invalid email or password."}));

        const sessionPayload = {
            userId: result._id.toString(),
        };
        
        const session_token = jwt.sign(sessionPayload, process.env.JWT_SESSION_SECRET || '', { expiresIn: '15d' }); // Session valid for 15 days
        const days = 15 * 24 * 60 * 60 * 1000;
    
        res.cookie('session', session_token, { maxAge: days });

        res.send(JSON.stringify({ success: "Logged In!" }));
    } catch (error) {
        console.log(`API ERROR (/api/auth/login): ${error}`);
        res.status(500).send(JSON.stringify({error: 'Internal Server Error'}));
    }
}