import { LOGIN_STORE_NAME, isLoggedDBKeys } from '../constants';
import { Account } from '../interfaces';
import { Account as AuthAccount } from 'src/angular/app/modules/authorization/intefraces';
import { SeriveWorkerEvents } from '../constants/events-type';

export async function createAccount(channel: BroadcastChannel, db, account: AuthAccount) {
    const date: number = Date.now();
    const newAccount: Account = {
        login: account.login,
        password: account.password,
        salt: 'salt',
        creationTime: date,
        lastUpdateTime: date,
    };

    await db.put(LOGIN_STORE_NAME, newAccount, isLoggedDBKeys.account);

    channel.postMessage({ type: SeriveWorkerEvents.createAccount, data: true });
}
