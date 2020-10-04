import { MongoClient, Db } from 'mongodb';

import { SERVER_URL, DB_NAME } from '../consts/database';

export class Database {
    private static db: Db;
    private static mongoClient: MongoClient;

    private constructor() {}

    static async getDB(): Promise<Db> {
        if (!this.isConnected()) {
            try {
                Database.mongoClient = await MongoClient.connect(
                    `mongodb://${SERVER_URL}`,
                    {
                        useNewUrlParser: true,
                        autoReconnect: false,
                    });
                Database.db = Database.mongoClient.db(DB_NAME);
                Database.mongoClient.once('close', () => Database.close());
            } catch (e) {
                console.log('error to connect to db', e);
            }
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
