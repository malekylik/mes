import { MongoRange } from '../ranges/MongoRange';

export interface Translater {
    translate(range: MongoRange): string;
}
