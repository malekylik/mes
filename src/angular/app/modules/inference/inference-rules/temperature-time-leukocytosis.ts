import { BaseInferenceRule } from './base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

export class TemperatureTimeLeukocytosis extends BaseInferenceRule {
    toString(): string {
        return 'Temperature-Time-Leukocytosis';
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            '$match': {
                t: rule.t,
                T: rule.T,
                'oak.L': rule.oak.L,
            }
        };
    }
}
