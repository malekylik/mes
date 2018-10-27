import { MongoClient, Db } from 'mongodb';
import { Observable, of, Observer } from 'rxjs';

const { SERVER_URL, DB_NAME } = require('../consts/database');

export class Database {
    private static db: Db;
    private static mongoClient: MongoClient;

    private constructor() {}

    static async connectDb(): Promise<Db>  {
        Database.mongoClient = await MongoClient.connect(`mongodb://${SERVER_URL}`, { useNewUrlParser: true })
        Database.db = Database.mongoClient.db(DB_NAME);

        return Database.db;
    }

    static getDB(): Db {
        return Database.db;
    }

    static isConnected(): boolean {
        return !!Database.mongoClient;
    }

    static async close():Promise<void> {
        await Database.mongoClient.close();
        Database.mongoClient = null;

        return;
    }
}
