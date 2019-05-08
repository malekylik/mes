import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';
import { SeriveWorkerEvents } from '../constants/events-type';

export async function isAccountCreated(channel: BroadcastChannel, db) {
    const count = await db.count(LOGIN_STORE_NAME, isLoggedDBKeys.account);
    const _isAccountCreated: boolean = Boolean(count);

    channel.postMessage({ type: SeriveWorkerEvents.isAccountCreated, data: _isAccountCreated });
}

