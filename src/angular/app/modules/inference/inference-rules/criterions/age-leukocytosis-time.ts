import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

const criterionId = 'Age-Leukocytosis-Time';

export class AgeLeukocytosisTime extends BaseInferenceRule {
    toString(): string {
        return criterionId;
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            age: rule.age,
            t: rule.t,
            'oak.L': rule.oak.L,
        };
    }

    static id(): string {
        return criterionId;
    }
}
