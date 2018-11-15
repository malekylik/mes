import { MongoRange } from './MongoRange';
import { Translater } from '../translaters/translater';
import { InRussianTranslater } from '../translaters/in-russian.translater';

export class Range {
    private range: MongoRange = new MongoRange();
    private translater: Translater = new InRussianTranslater();

    private constructor() {}

    get $gt(): number {
        return this.range.$gt;
    }

    set $gt($gt: number) {
        this.range.$gt = $gt;
    }

    get $gte(): number {
        return this.range.$gte;
    }

    set $gte($gte: number) {
        this.range.$gte = $gte;
    }

    get $lt(): number {
        return this.range.$lt;
    }

    set $lt($lt: number) {
        this.range.$lt = $lt;
    }

    get $lte(): number {
        return this.range.$lte;
    }

    set $lte($lte: number) {
        this.range.$lte = $lte;
    }

    get inHumanLanguage(): string {
        return this.translater.translate(this.range);
    }

    toString(): string {
        const { $gt, $lt } = this.range;

        return `(${$gt};${$lt})`;
    }

    inRange(value: number): boolean {
        const { $gt, $lt } = this.range;

        return (value > $gt && value < $lt);
    }

    outRange(value: number): boolean {
        const { $gte, $lte } = this.range;

        return (value < $gte && value > $lte);
    }

    static fromString(stringRange: string, precision: number = 1): Range {
        const [left, right] = stringRange.trim().split(';');

        let leftNumber: number = Number(left.slice(1));
        let rightNumber: number = Number(right.slice(0, right.length - 1));

        if (
            (left[0] !== '[' && left[0] !== '(') ||
            (right[right.length - 1] !== ']' && right[right.length - 1] !== ')') ||
            (Number.isNaN(leftNumber) || Number.isNaN(rightNumber))
        ) {
            throw Error('Range string is invalid');
        }

        const range: Range = new Range();

        if (left[0] === '[') {
            range.$gte = leftNumber;
            range.$gt = range.$gte - precision;
        } else {
            range.$gt = leftNumber;
            range.$gte = range.$gt + precision;
        }

        if (right[right.length - 1] === ']') {
            range.$lte = rightNumber;
            range.$lt = range.$lte + precision;
        } else {
            range.$lt = rightNumber;
            range.$lte = range.$lt - precision;
        }

        return range;
    }

    static fromMongoRange(mongoRange: MongoRange, precision: number = 1): Range {
        const { $gt, $gte, $lt, $lte } = mongoRange;
        const range: Range = new Range();

        if ($gt) {
            range.$gt = $gt;
            range.$gte = $gt + precision;
        } else if ($gte) {
            range.$gte = $gte;
            range.$gt = $gte - precision;
        } else {
            range.$gt = -Infinity;
            range.$gte = -Infinity;
        }

        if ($lt) {
            range.$lt = $lt;
            range.$lte = $lt - precision;
        } else if ($lte) {
            range.$lte = $lte;
            range.$lt = $lte + precision;
        } else {
            range.$lt = Infinity;
            range.$lte = Infinity;
        }

        return range;
    }
}
