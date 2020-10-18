import { Rule } from 'src/electron/interfaces/Rule';
import { parseCSVFile } from './csv';
import { RuleFormFields, DiagnosticFormFields, OAKFormFields } from 'src/angular/app/modules/rule/constants/index';

export function getMaximumValue(arr, getValue = id => id) {
    let max = arr.length > 0 ? getValue(arr[0]) : undefined;

    for (let i = 1; i < arr.length; i++) {
      const v = getValue(arr[i]);

      if (max < v) {
        max = v;
      }
    }

    return max;
}

type PartialRule = Omit<Rule, 'creationTime' | 'lastUpdateTime'>

export function parseCSVToRule(fileStr: string): PartialRule {
  const parsedCSV = parseCSVFile(fileStr);

  const ageIndx = parsedCSV.rows?.[0]?.indexOf(DiagnosticFormFields.age);
  const age = parsedCSV.rows?.[1]?.[ageIndx] ?? null;
  const tIndx = parsedCSV.rows?.[0]?.indexOf(DiagnosticFormFields.T);
  const T = parsedCSV.rows?.[1]?.[tIndx] ?? null;
  const sexIndx = parsedCSV.rows?.[0]?.indexOf(DiagnosticFormFields.sex);
  const sex = parsedCSV.rows?.[1]?.[sexIndx] ?? null;
  const timeIndx = parsedCSV.rows?.[0]?.indexOf(DiagnosticFormFields.time);
  const time = parsedCSV.rows?.[1]?.[timeIndx] ?? null;
  const vomitingIndx = parsedCSV.rows?.[0]?.indexOf(DiagnosticFormFields.vomiting);
  const vomiting = parsedCSV.rows?.[1]?.[vomitingIndx] ?? null;
  const leukocytosisIndx = parsedCSV.rows?.[0]?.findIndex(s => s.includes(OAKFormFields.leukocytosis));
  const leukocytosis = parsedCSV.rows?.[1]?.[leukocytosisIndx] ?? null;
  const neutrophiliaIndx = parsedCSV.rows?.[0]?.findIndex(s => s.includes(OAKFormFields.neutrophilia));
  const neutrophilia = parsedCSV.rows?.[1]?.[neutrophiliaIndx] ?? null;
  const lymphocytosisIndx = parsedCSV.rows?.[0]?.findIndex(s => s.includes(OAKFormFields.lymphocytosis));
  const lymphocytosis = parsedCSV.rows?.[1]?.[lymphocytosisIndx] ?? null;
  const nameIndx = parsedCSV.rows?.[0]?.findIndex(s => s.includes(RuleFormFields.name));
  const name = parsedCSV.rows?.[1]?.[nameIndx] ?? null;
  const diagnosisIndx = parsedCSV.rows?.[0]?.findIndex(s => s.includes(RuleFormFields.diagnosis));
  const diagnosis = parsedCSV.rows?.[1]?.[diagnosisIndx] ?? null;

  return ({
    name,
    age,
    T,
    sex,
    vomiting,
    t: time,
    diagnosis,
    oak: {
      L: leukocytosis,
      nf: Number(neutrophilia),
      lf: Number(lymphocytosis),
    },
  });
}
