import { ObjectId } from 'bson';

import { Rule } from './Rule';
import { OAK } from './OAK';

export class BaseRule implements Rule {
    _id?: ObjectId;
    name: string;
    age: string;
    t: string;
    T: string;
    oak: OAK;
    diagnosis: string;
    creationTime: number;
    lastUpdateTime: number;

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
        this.name = name;
        this.age = age;
        this.T = T;
        this.t = time;
        this.diagnosis = diagnosis;
        this.oak = oak;

        this.init(creationTime, lastUpdateTime);
    }

    private init(creationTime?: number, lastUpdateTime?: number): void {
        let time: number;

        if (!creationTime || !lastUpdateTime) {
            time = Date.now();
        }

        if (!creationTime) {
            this.creationTime = time;
        } else {
            this.creationTime = creationTime;
        }

        if (!lastUpdateTime) {
            this.lastUpdateTime = time;
        } else {
            this.lastUpdateTime = lastUpdateTime;
        }
    }
}
