import { DBSettings } from './app/interfaces/db-settings';
import { CHANNEL_NAME } from './app/constants/service-worker';

const LOGIN_DB_SETTINGS: DBSettings = {
    name: 'login',
    version: 1,
}

const LOGIN_SUCCESS_DB_SETTINGS: DBSettings = {
    name: 'loginSuccess',
    version: 1,
}

let loginDb: IDBDatabase = null;
let loginSuccessDb: IDBDatabase = null;
const worker: any = self;

function createIndexDB(name: string, version: number, upgradeneeded?: (event: Event) => void): Promise<IDBDatabase> {
    const dbOpenRequest: IDBOpenDBRequest = indexedDB.open(name, version);

    dbOpenRequest.onupgradeneeded = upgradeneeded;

    return new Promise((resolve, reject) => {
        dbOpenRequest.onsuccess = _ => resolve(dbOpenRequest.result);
        dbOpenRequest.onerror = error => reject(error);
    });
}

async function createDB() {
    const [_loginDb] = await Promise.all([createIndexDB(LOGIN_DB_SETTINGS.name, LOGIN_DB_SETTINGS.version)]);

    loginDb = _loginDb;

    return null;
}

async function createChannel() {
    const channel: BroadcastChannel = new BroadcastChannel(CHANNEL_NAME);

    channel.addEventListener('message', ({ data }) => {
        channel.postMessage({ type: 'ok', value: true });
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
