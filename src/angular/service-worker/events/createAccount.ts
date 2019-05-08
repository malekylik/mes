import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';
import { Account } from '../interfaces';
import { Account as AuthAccount } from 'src/angular/app/modules/authorization/intefraces';
import { SeriveWorkerEvents } from '../constants/events-type';
import { generateSalt, generateHash } from '../utils/crypto';

export async function createAccount(channel: BroadcastChannel, db, account: AuthAccount) {
    const salt: string = generateSalt();
    const passwordHash: string = generateHash(account.password + salt);
    const date: number = Date.now();

    const newAccount: Account = {
        salt,
        login: account.login,
        password: passwordHash,
        creationTime: date,
        lastUpdateTime: date,
    };

    await db.put(LOGIN_STORE_NAME, newAccount, isLoggedDBKeys.account);

    channel.postMessage({ type: SeriveWorkerEvents.createAccount, data: true });
}
