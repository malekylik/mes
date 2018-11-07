import { ObjectId } from 'bson';

import { Rule } from './Rule';
import { OAK } from './OAK';

export class BaseRule implements Rule {
    _id?: ObjectId;
    name: string;
    age: string;
    T: string;
    oak: OAK;
    diagnosis: string;
    creationTime: number;
    lastUpdateTime: number;

    constructor(rule: Partial<Rule>) {
        this.init(rule)
    }

    private init(rule: Partial<Rule>): void {
        Object.keys(rule).forEach((key) => {
            this[key] = rule[key];
        });

        const time: number = Date.now();

        if (!this.creationTime) {
            this.creationTime = time;
        }

        this.lastUpdateTime = time;
    }
}
