import { ObjectId } from "bson";

import { RuleFieldsName } from '../consts';
import { OAK } from './OAK';

export interface Rule {
    [RuleFieldsName.id]?: ObjectId,
    [RuleFieldsName.name]: string,
    [RuleFieldsName.age]: string,
    [RuleFieldsName.time]: string,
    [RuleFieldsName.T]: string,
    [RuleFieldsName.oak]: OAK,
    [RuleFieldsName.diagnosis]: string,
    [RuleFieldsName.creationTime]: number,
    [RuleFieldsName.lastUpdateTime]: number,
}
