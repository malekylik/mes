import { Rule } from './Rule';

export interface DiagnosisInfo {
    _id: string;
    count: number;
    rules: Partial<Rule[]>,
}
