import { openDB } from 'idb/with-async-ittr.js';

import { 
    CHANNEL_NAME,
    LOGIN_STORE_NAME,
    IS_LOGGED_STORE_NAME,
    LOGIN_DB_SETTINGS,
    isLoggedDBKeys,
} from './constants';
import { SeriveWorkerEvents } from './constants/events-type';
import { MyDB } from './interfaces';
import { isLogged, isAccountCreated, checkLogin, checkPassword, createAccount, login } from './events';

const worker: any = self;
let loginDb = null;

function upgradeDB(upgradeDB): void {
    const accountStore = upgradeDB.createObjectStore(LOGIN_STORE_NAME);
    const store = upgradeDB.createObjectStore(IS_LOGGED_STORE_NAME);

    store.put(false, isLoggedDBKeys.isLogged);
}

async function createDB() {
    loginDb = await openDB<MyDB>(
        LOGIN_DB_SETTINGS.name,
        LOGIN_DB_SETTINGS.version,
        { upgrade: upgradeDB }
    );

    await loginDb.put(IS_LOGGED_STORE_NAME, false, isLoggedDBKeys.isLogged);

    return null;
}

async function createChannel() {
    const channel: BroadcastChannel = new BroadcastChannel(CHANNEL_NAME);

    channel.addEventListener('message', ({ data: { type, data } }) => {
        switch (type) {
            case SeriveWorkerEvents.isLogged: isLogged(channel, loginDb); break;
            case SeriveWorkerEvents.isAccountCreated: isAccountCreated(channel, loginDb); break;
            case SeriveWorkerEvents.checkLogin: checkLogin(channel, loginDb, data); break;
            case SeriveWorkerEvents.checkPassword: checkPassword(channel, loginDb, data); break;
            case SeriveWorkerEvents.createAccount: createAccount(channel, loginDb, data); break;
            case SeriveWorkerEvents.login: login(channel, loginDb); break;
        }
    });

    return null;
}

self.addEventListener('install', function(event: any) {
    event.waitUntil(worker.skipWaiting());
});

self.addEventListener('activate', function(event: any) {
    event.waitUntil(Promise.all([
        createDB(), 
        createChannel(),
    ]),
    worker.clients.claim(),
    );
});
