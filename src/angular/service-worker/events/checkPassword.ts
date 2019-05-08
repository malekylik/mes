import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';
import { Account } from '../interfaces';
import { SeriveWorkerEvents } from '../constants/events-type';

export async function checkPassword(channel: BroadcastChannel, db, password: string) {
    const account: Account = await db.get(LOGIN_STORE_NAME, isLoggedDBKeys.account);
    const _isPasswordValid: boolean = password === account.password;

    channel.postMessage({ type: SeriveWorkerEvents.checkPassword, data: _isPasswordValid });
}
