import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

const criterionId = 'Vomiting-Time-Age';

export class VomitingTimeAge extends BaseInferenceRule {
    toString(): string {
        return criterionId;
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            age: rule.age,
            t: rule.t,
            vomiting: rule.vomiting,
        };
    }

    static id(): string {
        return criterionId;
    }
}
