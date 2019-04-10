import { BaseInferenceRule } from '../base-inference-rule';
import { Rule } from 'src/electron/interfaces/Rule';
import { map } from 'src/angular/app/utils/interfaces/map';

export class VomitingTimeTemperature extends BaseInferenceRule {
    toString(): string {
        return 'Vomiting-Time-Temperature';
    }

    protected async getMathcher(rulesDb: any, rule: Rule): Promise<map<any>> {
        return {
            vomiting: rule.vomiting,
            t: rule.t,
            T: rule.T,
        };
    }
}
