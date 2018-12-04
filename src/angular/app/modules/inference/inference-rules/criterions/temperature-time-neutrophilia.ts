import { Cursor } from 'mongodb';

import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

export class TemperatureTimeNeutrophilia extends BaseInferenceRule {
    toString(): string {
        return 'Temperature-Time-Neutrophilia';
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        const minCursor: Cursor<{ nf: number }> = await rulesDb.aggregate([{ '$match': { T: rule.T, t: rule.t } }, { '$group': { _id: null, nf: { '$min': '$oak.nf' } } }]);
        const maxCursor: Cursor<{ nf: number }> = await rulesDb.aggregate([{ '$match': { T: rule.T, t: rule.t } }, { '$group': { _id: null, nf: { '$max': '$oak.nf' } } }]);

        const nfMatch: object = {};

        if (await minCursor.hasNext()) {
            nfMatch['$gte'] = (await minCursor.next()).nf;
        }

        if (await maxCursor.hasNext()) {
            nfMatch['$lte'] = (await maxCursor.next()).nf;
        }

        return {
            T: rule.T,
            t: rule.t,
            'oak.nf': nfMatch,
        };
    }
}
