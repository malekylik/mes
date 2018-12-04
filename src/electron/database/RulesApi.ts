import { Cursor, FilterQuery, DeleteWriteOpResultObject, ObjectId, AggregationCursor } from 'mongodb';

import { Database } from './Database'; 
import { Rule } from '../interfaces/Rule';
import { DiagnosisInfo } from '../interfaces/DiagnosisInfo';
import { COLLECTIONS } from '../consts/database';

export class RulesApi {
    static async getRules(filterQuery?: FilterQuery<any>): Promise<Cursor<Rule>> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .find(filterQuery);
    }

    static async getCount(): Promise<number> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .countDocuments();
    }

    static async deleteRule(id: string): Promise<DeleteWriteOpResultObject> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .deleteOne({ _id: new ObjectId(id) });
    }

    static async aggregate(pipeline: Object[]): Promise<AggregationCursor<DiagnosisInfo>> {
        return (await Database.getDB())
                .collection(COLLECTIONS.Rules)
                .aggregate(pipeline);
    }
} 
