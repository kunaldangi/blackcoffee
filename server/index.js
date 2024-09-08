import { config as envSetup } from "dotenv"; envSetup();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

import { connectDb } from './db/index.js';
import { initializeRoutes } from './api/index.js';
import { cookieValidator } from "./cookieValidate.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = 80;

let corsOptions = { // Cross-Origin Resource Sharing (CORS) configuration
    origin: function (origin, callback) {
        console.log("Origin: ", origin);
        if (origin?.startsWith("http://localhost") || origin === undefined) {
            callback(null, true)
        }
        else{
            callback(new Error('You are not allowed to access this server!'));
        }
    },
    credentials: true
}

async function main(){
	const app = express();
	await connectDb();

	app.use(bodyParser.json()); // parsing JSON data
	app.use(cors(corsOptions)); // enabling CORS
    app.use(cookieParser()); // enabling cookie parser

	app.use(cookieValidator); // validating cookies
	
	app.use(express.static(path.join(__dirname, '../client/dist')));
	
	app.get('*', (req, res) => {
		if (!req.path.startsWith('/api')) {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		} else {
			res.status(404).send('API endpoint not found');
		}
	});

	initializeRoutes(app);
	
	app.listen(port, () => {
		console.log(`Server is listening on PORT: ${port}`)
	})
}

main();
