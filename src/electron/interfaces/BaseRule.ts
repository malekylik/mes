import { ObjectId } from 'mongodb';

import { Rule } from './Rule';
import { OAK } from './OAK';

export class BaseRule implements Rule {
    _id?: ObjectId;
    t: string;
    creationTime: number;
    lastUpdateTime: number;

    constructor(
        public name: string,
        public age: string,
        public sex: string,
        public T: string,
        public diagnosis: string,
        public oak: OAK,
        time: string,
        creationTime?: number,
    ) {
        this.t = time;

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
