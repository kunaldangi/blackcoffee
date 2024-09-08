import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";

const mongoClient = new MongoClient(uri);
let db = null;
let collection = {
    trends: null,
    userinfo: null
};

async function connectDb() {
    try {
        console.log('MongoDB: Connecting to DB...');
        db = mongoClient.db('blackcoffer');
        collection.trends = db.collection('trends');
        collection.userinfo = db.collection('userinfo');

        console.log('MongoDB: Connected to DB');
    }
    catch (e) {
        console.error(`MongoDB: DB Connection Error: ${e}`);
    }
}

export {connectDb, mongoClient, db, collection};