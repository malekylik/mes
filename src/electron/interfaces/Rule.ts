import { ObjectId } from 'mongodb';

import { OAK } from './OAK';

export interface Rule {
    _id?: ObjectId,
    name: string,
    age: string,
    sex: string,
    t: string,
    T: string,
    oak: OAK,
    diagnosis: string,
    creationTime: number,
    lastUpdateTime: number,
}
