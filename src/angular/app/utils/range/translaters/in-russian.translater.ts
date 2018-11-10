import { Translater } from './translater';
import { MongoRange } from '../ranges/MongoRange';

export class InRussianTranslater implements Translater {
    translate(range: MongoRange): string {
        if (range.$gte === range.$lte) {
            return String(range.$gte);
        }

        let str: string = `от ${range.$gte}`;

        if (Number.isFinite(range.$lt)) {
            str += ` до ${range.$lt}`;
        }

        return str;
    }
}
