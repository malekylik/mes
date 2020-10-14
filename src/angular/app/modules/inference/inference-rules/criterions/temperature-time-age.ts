import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

const criterionId = 'Temperature-Time-Age';

export class TemperatureTimeAge extends BaseInferenceRule {
    toString(): string {
        return criterionId;
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            t: rule.t,
            T: rule.T,
            age: rule.age,
        };
    }

    static id(): string {
        return criterionId;
    }
}
