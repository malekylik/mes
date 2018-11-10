import { Range } from '../../../utils/range';

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
    Range.fromString('[10;15)'),
    Range.fromString('[16;20)'),
    Range.fromString('[21;Infinity)'),
];

const TIMES: Range[] = [
    Range.fromString('[0;6)'),
    Range.fromString('[7;12)'),
    Range.fromString('[13;24)'),
    Range.fromString('[25;Infinity)'),
];

export {
    AGES,
    TS,
    LS,
    TIMES,
};
