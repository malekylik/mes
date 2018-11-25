import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';

import { InferenceRule, InferenceRuleConstructor } from '../../inference-rules/inference-rule.model';
import { AgeLeukocytosisTime } from '../../inference-rules/age-leukocytosis-time';
import { Rule } from 'src/electron/interfaces/Rule';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';
import { map } from 'src/angular/app/utils/interfaces/map';
import { Observable } from 'rxjs';
import { GeneralDiagnosisInfo } from 'src/electron/interfaces/GeneralDiagnosisInfo';

@Injectable()
export class InferenceService {

  private rulesApi;
  private currentInferenceRule: InferenceRule = null;
  private infereceRules: InferenceRuleConstructor[] = [
    AgeLeukocytosisTime,
  ];

  constructor(private electronService: ElectronService) {
    this.rulesApi = this.electronService.remote.require('./database/RulesApi').RulesApi;
  }

  inference(rule: Rule): Observable<map<DiagnosisInfo[]>> {
    return from(this.asyncInference(rule));
  }

  private async asyncInference(rule: Rule): Promise<map<DiagnosisInfo[]>> {
    const result: map<DiagnosisInfo[]> = {};

    for (let C of this.infereceRules) {
      const inferenceRule: InferenceRule = new C();
      result[inferenceRule.toString()] = await inferenceRule.inference(this.rulesApi, rule);

    }

    return result;
  }

  getGeneralInfo(criteria: map<DiagnosisInfo[]>): GeneralDiagnosisInfo[] {
    const temp: map<GeneralDiagnosisInfo> = {};
    const result: GeneralDiagnosisInfo[] = [];

    Object.keys(criteria).forEach((cretiri) => {
      const diagnosisInfo: DiagnosisInfo[] = criteria[cretiri];
      const diagnosis: string = diagnosisInfo.reduce((prev: DiagnosisInfo, curr: DiagnosisInfo) => {
        return prev.count > curr.count ? prev : curr;
      }, diagnosisInfo[0])._id;

      if (!temp[diagnosis]) {
        temp[diagnosis] = {
          diagnosis,
          count: 0,
          criteriaName: [],
        };
      }

      temp[diagnosis].count += 1;
      temp[diagnosis].criteriaName.push(cretiri);
    });

    Object.keys(temp).forEach((d) => {
      result.push(temp[d]);
    });

    return result.sort((l: GeneralDiagnosisInfo, r: GeneralDiagnosisInfo) => l.count - r.count);
  }
}
