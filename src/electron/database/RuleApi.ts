import { InsertOneWriteOpResult, UpdateWriteOpResult, ObjectId } from 'mongodb';

import { Database } from './Database';
import { Rule } from '../interfaces/Rule';
import { COLLECTIONS } from '../consts/database';

export class RuleApi {
    static async insertRule(rule: Rule): Promise<InsertOneWriteOpResult> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .insertOne(rule);
    }

    static async updateRule(id: string, rule: Rule): Promise<UpdateWriteOpResult> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .updateOne({ _id: new ObjectId(id) }, { $set: { ...rule } });
    }

    static async getRule(id: string): Promise<Rule> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .findOne({ _id: new ObjectId(id) });
    }
}
