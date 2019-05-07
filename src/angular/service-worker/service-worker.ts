import { openDB } from 'idb/with-async-ittr.js';

import { 
    CHANNEL_NAME,
    IS_LOGGED_STORE_NAME,
    LOGIN_DB_SETTINGS,
    isLoggedDBKeys,
} from './constants';
import { SeriveWorkerEvents } from './constants/events-type';
import { MyDB } from './interfaces';
import { isLogged } from './events';

const worker: any = self;
let loginDb = null;

function upgradeDB(upgradeDB): void {
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

    channel.addEventListener('message', ({ data: { type } }) => {
        switch (type) {
            case SeriveWorkerEvents.isLogged: isLogged(channel, loginDb);
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
