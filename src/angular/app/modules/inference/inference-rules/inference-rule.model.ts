import { Rule } from 'src/electron/interfaces/Rule';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';

export interface InferenceRule {
    inference(rulesDb: any, rule: Rule): Promise<DiagnosisInfo[]>;
}

export interface InferenceRuleConstructor {
    new (): InferenceRule;
}
