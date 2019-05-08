import { DBSettings } from '../interfaces';

export const CHANNEL_NAME: string = 'sw-messages';

export const LOGIN_STORE_NAME: 'login-store' = 'login-store';
export const IS_LOGGED_STORE_NAME: 'logged-store' = 'logged-store';

export const LOGIN_DB_SETTINGS: DBSettings = {
    name: 'login',
    version: 4,
}


export enum isLoggedDBKeys {
    isLogged = 'isLogged',
    account = 'account',
}
