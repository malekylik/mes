import { IS_LOGGED_STORE_NAME, isLoggedDBKeys } from '../constants';

export async function isLogged(channel: BroadcastChannel, db) {
    const _isLogged: boolean = await db.get(IS_LOGGED_STORE_NAME, isLoggedDBKeys.isLogged);

    channel.postMessage(_isLogged);
}
