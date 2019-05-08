import { IS_LOGGED_STORE_NAME, isLoggedDBKeys } from '../constants';
import { SeriveWorkerEvents } from '../constants/events-type';

export async function isLogged(channel: BroadcastChannel, db) {
    const _isLogged: boolean = await db.get(IS_LOGGED_STORE_NAME, isLoggedDBKeys.isLogged);

    channel.postMessage({ type: SeriveWorkerEvents.isLogged, data: _isLogged });
}
