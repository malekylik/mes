import { BaseInferenceRule } from './base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

export class AgeLeukocytosisTime extends BaseInferenceRule {
    toString(): string {
        return "Age-Leukocytosis-Time";
    }

    protected getMathcher(rulesDb: any, rule: Rule): map<any> {
        return {
            "$match": {
                age: rule.age,
                t: rule.t,
                "oak.L": rule.oak.L,
            }
        };
    }
}
