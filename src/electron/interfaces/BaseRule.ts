import { ObjectId } from 'mongodb';

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
    ) {
        this.name = name;
        this.age = age;
        this.T = T;
        this.t = time;
        this.diagnosis = diagnosis;
        this.oak = oak;

        this.init(creationTime);
    }

    private init(creationTime?: number): void {
        const time: number = Date.now();

         if (!creationTime) {
            this.creationTime = time;
        } else {
            this.creationTime = creationTime;
        }

        this.lastUpdateTime = time;
    }
}
