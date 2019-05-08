import { DBSchema  } from 'idb/with-async-ittr.js';

import { LOGIN_STORE_NAME, IS_LOGGED_STORE_NAME } from '../constants';

export interface DBSettings {
    name: string;
    version: number;
}

export interface MyDB extends DBSchema {
    [IS_LOGGED_STORE_NAME]: {
        key: string,
        value: boolean,
    },
    [LOGIN_STORE_NAME]: {
        key: string,
        value: Account,
    }
}

export interface Account {
    login: string,
    password: string,
    salt: string,
    creationTime: number,
    lastUpdateTime: number,
}
