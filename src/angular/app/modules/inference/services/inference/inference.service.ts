import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';

import { InferenceRule, InferenceRuleConstructor } from '../../inference-rules/inference-rule.model';
import { Rule } from 'src/electron/interfaces/Rule';
import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';
import { map } from 'src/angular/app/utils/interfaces/map';
import { Observable } from 'rxjs';
import { GeneralDiagnosisInfo } from 'src/electron/interfaces/GeneralDiagnosisInfo';
import { AgeLeukocytosisTime } from '../../inference-rules/criterions/age-leukocytosis-time';
import { TimeNeutrophiliaAge } from '../../inference-rules/criterions/time-neutrophilia-age';
import { TimeLymphocytosisAge } from '../../inference-rules/criterions/time-lymphocytosis-age';
import { TemperatureTimeLeukocytosis } from '../../inference-rules/criterions/temperature-time-leukocytosis';
import { TemperatureTimeAge } from '../../inference-rules/criterions/temperature-time-age';
import { TemperatureTimeNeutrophilia } from '../../inference-rules/criterions/temperature-time-neutrophilia';
import { TemperatureTimeLymphocytosis } from '../../inference-rules/criterions/temperature-time-lymphocytosis';

@Injectable()
export class InferenceService {

  private rulesApi;
  private infereceRules: InferenceRuleConstructor[] = [
    AgeLeukocytosisTime,
    TimeNeutrophiliaAge,
    TimeLymphocytosisAge,
    TemperatureTimeLeukocytosis,
    TemperatureTimeAge,
    TemperatureTimeNeutrophilia,
    TemperatureTimeLymphocytosis,
  ];

  constructor(private electronService: ElectronService) {
    this.rulesApi = this.electronService.remote.require('./database/RulesApi').RulesApi;
  }

  inference(rule: Rule): Observable<map<DiagnosisInfo[]>> {
    return from(this.asyncInference(rule));
  }

  getGeneralInfo(criteria: map<DiagnosisInfo[]>): GeneralDiagnosisInfo[] {
    const temp: map<GeneralDiagnosisInfo> = {};
    const result: GeneralDiagnosisInfo[] = [];

    Object.keys(criteria).forEach((cretiri) => {
      const diagnosisInfo: DiagnosisInfo[] = [...criteria[cretiri]].sort((l, r) => r.count - l.count);

      if (diagnosisInfo.length) {
        const max: number = diagnosisInfo[0].count;

        for (let i = 0; i < diagnosisInfo.length && max === diagnosisInfo[i].count; i++) {
          const diagnosisName: string = diagnosisInfo[i]._id;

          if (!temp[diagnosisName]) {
            temp[diagnosisName] = {
              diagnosis: diagnosisName,
              count: 0,
              criteriaName: [],
            };
          }

          temp[diagnosisName].count += 1;
          temp[diagnosisName].criteriaName.push(cretiri);
        }
      }
    });

    Object.keys(temp).forEach((d) => {
      result.push(temp[d]);
    });

    return result.sort((l: GeneralDiagnosisInfo, r: GeneralDiagnosisInfo) => r.count - l.count);
  }

  private async asyncInference(rule: Rule): Promise<map<DiagnosisInfo[]>> {
    const result: map<DiagnosisInfo[]> = {};

    for (let C of this.infereceRules) {
      const inferenceRule: InferenceRule = new C();
      result[inferenceRule.toString()] = await inferenceRule.inference(this.rulesApi, rule);
    }

    return result;
  }
}
