import { AgeLeukocytosisTime } from '../inference-rules/criterions/age-leukocytosis-time';
import { TimeNeutrophiliaAge } from '../inference-rules/criterions/time-neutrophilia-age';
import { TimeLymphocytosisAge } from '../inference-rules/criterions/time-lymphocytosis-age';
import { TemperatureTimeLeukocytosis } from '../inference-rules/criterions/temperature-time-leukocytosis';
import { TemperatureTimeAge } from '../inference-rules/criterions/temperature-time-age';
import { TemperatureTimeNeutrophilia } from '../inference-rules/criterions/temperature-time-neutrophilia';
import { TemperatureTimeLymphocytosis } from '../inference-rules/criterions/temperature-time-lymphocytosis';
import { VomitingTimeAge } from '../inference-rules/criterions/vomiting-time-age';
import { VomitingTimeTemperature } from '../inference-rules/criterions/vomiting-time-temperature';
import { VomitingTimeNeutrophilia } from '../inference-rules/criterions/vomiting-time-neutrophilia';
import { VomitingTimeLeukocytosis } from '../inference-rules/criterions/vomiting-time-leukocytosis';


export enum CriterionWeight {
    AgeLeukocytosisTime = 9,
    TimeNeutrophiliaAge = 9,
    TimeLymphocytosisAge = 9,
    TemperatureTimeLeukocytosis = 9,
    TemperatureTimeAge = 9,
    TemperatureTimeNeutrophilia = 9,
    TemperatureTimeLymphocytosis = 9,
    VomitingTimeAge = 9,
    VomitingTimeTemperature = 9,
    VomitingTimeNeutrophilia = 9,
    VomitingTimeLeukocytosis = 9,
}

export const CriterionWeghtMap: Record<string, number> = {
    [AgeLeukocytosisTime.id()]: CriterionWeight.AgeLeukocytosisTime,
    [TimeNeutrophiliaAge.id()]: CriterionWeight.TimeNeutrophiliaAge,
    [TimeLymphocytosisAge.id()]: CriterionWeight.TimeLymphocytosisAge,
    [TemperatureTimeLeukocytosis.id()]: CriterionWeight.TemperatureTimeLeukocytosis,
    [TemperatureTimeAge.id()]: CriterionWeight.TemperatureTimeAge,
    [TemperatureTimeNeutrophilia.id()]: CriterionWeight.TemperatureTimeNeutrophilia,
    [TemperatureTimeLymphocytosis.id()]: CriterionWeight.TemperatureTimeLymphocytosis,
    [VomitingTimeAge.id()]: CriterionWeight.VomitingTimeAge,
    [VomitingTimeTemperature.id()]: CriterionWeight.VomitingTimeTemperature,
    [VomitingTimeNeutrophilia.id()]: CriterionWeight.VomitingTimeNeutrophilia,
    [VomitingTimeLeukocytosis.id()]: CriterionWeight.VomitingTimeLeukocytosis,
}
