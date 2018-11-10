import { ObjectId } from 'bson';

import { RuleFieldsName } from '../consts';
import { Rule } from './Rule';
import { OAK } from './OAK';

export class BaseRule implements Rule {
    [RuleFieldsName.id]?: ObjectId;
    [RuleFieldsName.name]: string;
    [RuleFieldsName.age]: string;
    [RuleFieldsName.time]: string;
    [RuleFieldsName.T]: string;
    [RuleFieldsName.oak]: OAK;
    [RuleFieldsName.diagnosis]: string;
    [RuleFieldsName.creationTime]: number;
    [RuleFieldsName.lastUpdateTime]: number;

    constructor(
        name: string,
        age: string,
        time: string,
        T: string,
        diagnosis: string,
        oak: OAK,
        creationTime?: number,
        lastUpdateTime?: number,
    ) {
        this[RuleFieldsName.name] = name;
        this[RuleFieldsName.age] = age;
        this[RuleFieldsName.T] = T;
        this[RuleFieldsName.time] = time;
        this[RuleFieldsName.diagnosis] = diagnosis;
        this[RuleFieldsName.oak] = oak;

        this.init(creationTime, lastUpdateTime);
    }

    private init(creationTime?: number, lastUpdateTime?: number): void {
        let time: number;

        if (!creationTime || !lastUpdateTime) {
            time = Date.now();
        }

        if (!creationTime) {
            this[RuleFieldsName.creationTime] = time;
        } else {
            this[RuleFieldsName.creationTime] = creationTime;
        }

        if (!lastUpdateTime) {
            this[RuleFieldsName.lastUpdateTime] = time;
        } else {
            this[RuleFieldsName.lastUpdateTime] = lastUpdateTime;
        }
    }
}
