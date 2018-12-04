import { Cursor } from 'mongodb';

import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

export class TimeLymphocytosisAge extends BaseInferenceRule {
    toString(): string {
        return 'Time-Lymphocytosis-Age';
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        const minCursor: Cursor<{ lf: number }> = await rulesDb.aggregate([{ '$match': { age: rule.age, t: rule.t } }, { '$group': { _id: null, lf: { '$min': '$oak.lf' } } }]);
        const maxCursor: Cursor<{ lf: number }> = await rulesDb.aggregate([{ '$match': { age: rule.age, t: rule.t } }, { '$group': { _id: null, lf: { '$max': '$oak.lf' } } }]);

        const lfMatch: object = {};

        if (await minCursor.hasNext()) {
            lfMatch['$gte'] = (await minCursor.next()).lf;
        }

        if (await maxCursor.hasNext()) {
            lfMatch['$lte'] = (await maxCursor.next()).lf;
        }

        return {
            age: rule.age,
            t: rule.t,
            'oak.lf': lfMatch,
        };
    }
}
