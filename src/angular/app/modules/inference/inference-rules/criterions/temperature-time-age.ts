import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

export class TemperatureTimeAge extends BaseInferenceRule {
    toString(): string {
        return 'Temperature-Time-Age';
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            t: rule.t,
            T: rule.T,
            age: rule.age,
        };
    }
}
