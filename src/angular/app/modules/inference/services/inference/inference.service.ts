import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';

import { InferenceRule } from '../../inference-rules/inference-rule.model';
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
import { VomitingTimeAge } from '../../inference-rules/criterions/vomiting-time-age';
import { VomitingTimeTemperature } from '../../inference-rules/criterions/vomiting-time-temperature';
import { VomitingTimeNeutrophilia } from '../../inference-rules/criterions/vomiting-time-neutrophilia';
import { VomitingTimeLeukocytosis } from '../../inference-rules/criterions/vomiting-time-leukocytosis';

@Injectable()
export class InferenceService {

  private rulesApi;
  private infereceRules: InferenceRule[] = [
    new AgeLeukocytosisTime(),
    new TimeNeutrophiliaAge(),
    new TimeLymphocytosisAge(),
    new TemperatureTimeLeukocytosis(),
    new TemperatureTimeAge(),
    new TemperatureTimeNeutrophilia(),
    new TemperatureTimeLymphocytosis(),
    new VomitingTimeAge(),
    new VomitingTimeTemperature(),
    new VomitingTimeNeutrophilia(),
    new VomitingTimeLeukocytosis(),
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
    const { infereceRules } = this;
    const result: map<DiagnosisInfo[]> = {};
    const inferencePromises: Array<Promise<DiagnosisInfo[]>> = new Array(infereceRules.length);

    for (let i = 0; i < infereceRules.length; i++) {
      inferencePromises[i] = infereceRules[i].inference(this.rulesApi, rule);
    }

    const infos = await Promise.all(inferencePromises);

    for (let i = 0; i < infereceRules.length; i++) {
      result[infereceRules[i].toString()] = infos[i];
    }

    return result;
  }
}
