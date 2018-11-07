import { ObjectId } from "bson";

import { OAK } from './OAK';

export interface Rule {
    _id?: ObjectId,
    name: string,
    age: string,
    T: string,
    oak: OAK,
    diagnosis: string,
    creationTime: number,
    lastUpdateTime: number,
}
