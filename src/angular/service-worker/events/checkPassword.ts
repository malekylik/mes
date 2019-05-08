import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';
import { Account } from '../interfaces';
import { SeriveWorkerEvents } from '../constants/events-type';
import { generateHash } from '../utils/crypto';

export async function checkPassword(channel: BroadcastChannel, db, password: string) {
    const account: Account = await db.get(LOGIN_STORE_NAME, isLoggedDBKeys.account);
    const passwordHash: string = generateHash(password + account.salt);
    const _isPasswordValid: boolean = passwordHash === account.password;

    channel.postMessage({ type: SeriveWorkerEvents.checkPassword, data: _isPasswordValid });
}
