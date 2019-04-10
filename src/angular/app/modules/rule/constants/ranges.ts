import { Range } from 'src/angular/app/utils/range';
import { FormOption } from 'src/angular/app/utils/interfaces/form-option';

const AGES: Range[] = [
    Range.fromString('[0;3)'),
    Range.fromString('[3;5)'),
    Range.fromString('[5;12)'),
    Range.fromString('[12;Infinity)'),
];

const TS: Range[] = [
    Range.fromString('[36.6;36.6]', 0.1),
    Range.fromString('[36.7;37.6)', 0.1),
    Range.fromString('[37.6;38.5)', 0.1),
    Range.fromString('[38.5;Infinity)', 0.1),
];

const LS: Range[] = [
    Range.fromString('[4;9)'),
    Range.fromString('[9;15)'),
    Range.fromString('[15;20)'),
    Range.fromString('[20;Infinity)'),
];

const TIMES: Range[] = [
    Range.fromString('[0;6)'),
    Range.fromString('[6;12)'),
    Range.fromString('[12;24)'),
    Range.fromString('[24;Infinity)'),
];

const VOMITINGS: Range[] = [
    Range.fromString('[0;0]'),
    Range.fromString('[1;5)'),
    Range.fromString('[5;10)'),
    Range.fromString('[10;Infinity)'),
];

const SEXES: FormOption[] = [
    {
        value: 'М',
        viewValue: 'M',
    },
    {
        value: 'F',
        viewValue: 'Ж',
    },
];

export {
    AGES,
    TS,
    LS,
    TIMES,
    VOMITINGS,
    SEXES,
};
