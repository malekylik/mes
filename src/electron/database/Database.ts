import { MongoClient, Db } from 'mongodb';

import { SERVER_URL, DB_NAME } from '../consts/database';

export class Database {
    private static db: Db;
    private static mongoClient: MongoClient;

    private constructor() {}

    static async getDB(): Promise<Db> {
        if (!this.isConnected()) {
            Database.mongoClient = await MongoClient.connect(
                `mongodb://${SERVER_URL}`,
                {
                    useNewUrlParser: true,
                    autoReconnect: false,
                });
            Database.db = Database.mongoClient.db(DB_NAME);
            Database.mongoClient.once('close', () => Database.close());
        }

        return Database.db;
    }

    static isConnected(): boolean {
        return !!Database.mongoClient;
    }

    static async close(): Promise<void> {
        await Database.mongoClient.close();
        Database.mongoClient = null;
    }
}
