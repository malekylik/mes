import { MongoRange } from './MongoRange';

export class Range {
    private range: MongoRange = new MongoRange();

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

    static fromString(stringRange: string): Range {
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
            range.$gt = range.$gte - 1;
        } else {
            range.$gt = leftNumber;
            range.$gte = range.$gt + 1;
        }

        if (right[right.length - 1] === ']') {
            range.$lte = rightNumber;
            range.$lt = range.$lte + 1;
        } else {
            range.$lt = rightNumber;
            range.$lte = range.$lt - 1;
        }

        return range;
    }

    static fromMongoRange(mongoRange: MongoRange): Range {
        const { $gt, $gte, $lt, $lte } = mongoRange;
        const range: Range = new Range();

        if ($gt) {
            range.$gt = $gt;
            range.$gte = $gt + 1;
        } else if ($gte) {
            range.$gte = $gte;
            range.$gt = $gte - 1;
        } else {
            range.$gt = -Infinity;
            range.$gte = -Infinity;
        }

        if ($lt) {
            range.$lt = $lt;
            range.$lte = $lt - 1;
        } else if ($lte) {
            range.$lte = $lte;
            range.$lt = $lte + 1;
        } else {
            range.$lt = Infinity;
            range.$lte = Infinity;
        }

        return range;
    }
}
