import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';
import { Account } from '../interfaces';
import { SeriveWorkerEvents } from '../constants/events-type';

export async function checkLogin(channel: BroadcastChannel, db, login: string) {
    const account: Account = await db.get(LOGIN_STORE_NAME, isLoggedDBKeys.account);
    const _isLoginValid: boolean = login === account.login;

    channel.postMessage({ type: SeriveWorkerEvents.checkLogin, data: _isLoginValid });
}
