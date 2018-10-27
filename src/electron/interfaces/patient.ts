import { ObjectId } from "bson";

export interface Patient {
    _id: ObjectId
    firstName: string;
    lastName: string;
}
