import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

const criterionId = 'Temperature-Time-Leukocytosis';

export class TemperatureTimeLeukocytosis extends BaseInferenceRule {
    toString(): string {
        return criterionId;
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            t: rule.t,
            T: rule.T,
            'oak.L': rule.oak.L,
        };
    }

    static id(): string {
        return criterionId;
    }
}
