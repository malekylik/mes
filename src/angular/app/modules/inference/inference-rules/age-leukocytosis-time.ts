import { Cursor } from 'mongodb';

import { InferenceRule } from './inference-rule.model';
import { Rule } from 'src/electron/interfaces/Rule';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';

export class AgeLeukocytosisTime implements InferenceRule {
    async inference(rulesDb: any, rule: Rule): Promise<DiagnosisInfo[]> {
        const cursor: Cursor = await rulesDb.aggregate([
            {
                "$match": {
                    age: rule.age,
                    t: rule.t,
                    "oak.L": rule.oak.L,
                }
            },
            {
                "$group": {
                    _id: "$diagnosis",
                    rules: {
                        "$push": {
                            _id: "$_id",
                            name: "$name",
                        }
                    },
                    count: { "$sum": 1 },
                }
            }
        ]);

        const rulesPromises = [];
  
        while (await cursor.hasNext()) rulesPromises.push(cursor.next());

        return Promise.all(rulesPromises);
    }

    toString(): string {
        return "Age-Leukocytosis-Time";
    }
}
