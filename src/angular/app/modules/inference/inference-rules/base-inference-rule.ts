import { Cursor } from 'mongodb';

import { InferenceRule } from './inference-rule.model';
import { map } from 'src/angular/app/utils/interfaces/map';
import { Rule } from 'src/electron/interfaces/Rule';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';

export abstract class BaseInferenceRule implements InferenceRule {
    async inference(rulesDb: any, rule: Rule): Promise<DiagnosisInfo[]> {
        const cursor: Cursor = await rulesDb.aggregate([
            await this.getMathcher(rulesDb, rule),
            {
                '$group': {
                    _id: '$diagnosis',
                    rules: {
                        '$push': {
                            _id: '$_id',
                            name: '$name',
                        }
                    },
                    count: { '$sum': 1 },
                }
            }
        ]);

        const rulesPromises = [];
  
        while (await cursor.hasNext()) rulesPromises.push(cursor.next());

        return Promise.all(rulesPromises);
    }

    abstract toString(): string;
    protected abstract getMathcher(rulesDb: any, rule: Rule): Promise<map<any>>;
}
