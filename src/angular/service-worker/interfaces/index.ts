import { DBSchema  } from 'idb/with-async-ittr.js';

import { IS_LOGGED_STORE_NAME } from '../constants';

export interface DBSettings {
    name: string;
    version: number;
}

export interface MyDB extends DBSchema {
    [IS_LOGGED_STORE_NAME]: {
        key: string,
        value: boolean,
    },
}
