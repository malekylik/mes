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

    static async updateRule(_id: ObjectId, rule: Partial<Rule>): Promise<UpdateWriteOpResult> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .updateOne({ _id: _id }, { $set: { rule } });
    }
}
