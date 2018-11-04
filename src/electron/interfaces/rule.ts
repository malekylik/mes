import { ObjectId } from "bson";

export interface Rule {
    _id: ObjectId
    name: string;
}
