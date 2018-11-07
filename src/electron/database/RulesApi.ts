import { Cursor, FilterQuery } from 'mongodb';

import { Database } from './Database'; 
import { Rule } from '../interfaces/Rule';
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
} 
