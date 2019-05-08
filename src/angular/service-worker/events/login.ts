import { IS_LOGGED_STORE_NAME, isLoggedDBKeys } from '../constants';
import { SeriveWorkerEvents } from '../constants/events-type';

export async function login(channel: BroadcastChannel, db) {
    await db.put(IS_LOGGED_STORE_NAME, true, isLoggedDBKeys.isLogged);

    channel.postMessage({ type: SeriveWorkerEvents.login, data: true });
}
