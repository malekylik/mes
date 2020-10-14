import { Cursor } from 'mongodb';

import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

const criterionId = 'Vomiting-Time-Neutrophilia';

export class VomitingTimeNeutrophilia extends BaseInferenceRule {
    toString(): string {
        return criterionId;
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        const minCursor: Cursor<{ nf: number }> = await rulesDb.aggregate([{ '$match': { vomiting: rule.vomiting, t: rule.t } }, { '$group': { _id: null, nf: { '$min': '$oak.nf' } } }]);
        const maxCursor: Cursor<{ nf: number }> = await rulesDb.aggregate([{ '$match': { vomiting: rule.vomiting, t: rule.t } }, { '$group': { _id: null, nf: { '$max': '$oak.nf' } } }]);
        const { oak: { nf } } = rule;

        const nfMatch: object = {};

        if (await minCursor.hasNext()) {
            nfMatch['$gte'] = (await minCursor.next()).nf;
        }

        if (await maxCursor.hasNext()) {
            nfMatch['$lte'] = (await maxCursor.next()).nf;
        }

        const inRange: boolean = (nf >= nfMatch['$gte'] && nf <= nfMatch['$lte']);

        return {
            vomiting: rule.vomiting,
            t: rule.t,
            'oak.nf': inRange ? nfMatch : NaN,
        };
    }

    static id(): string {
        return criterionId;
    }
}
