import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';

export async function isAccountCreated(channel: BroadcastChannel, db) {
    const count = await db.count(LOGIN_STORE_NAME, isLoggedDBKeys.isAccountCreated);
    const _isAccountCreated: boolean = Boolean(count);

    channel.postMessage(_isAccountCreated);
}

