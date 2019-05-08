import { Injectable } from '@angular/core';

import { CHANNEL_NAME } from 'src/angular/service-worker/constants';

@Injectable()
export class ServiceWorkerService {

  private sw: ServiceWorker = null;
  private channel: BroadcastChannel = new BroadcastChannel(CHANNEL_NAME);

  constructor() {
    navigator.serviceWorker.ready.then(_ => this.sw = navigator.serviceWorker.controller);
  }

  sendMessage(type: string, data?: any): Promise<any> {
    const action = new Promise((resolve, reject) => {
      const onmessage = ({ data }) => {
        if (data.type === type) {
          if (data.error) {
            reject(data.error);
        } else {
            resolve(data.data);
        }

        this.channel.removeEventListener('message', onmessage);
        }
      };

      this.channel.addEventListener('message', onmessage);
      this.channel.postMessage({ type, data });
    });

    if (this.sw) {
      return action;
    }

    return navigator.serviceWorker.ready
    .then(_ => action);
  }
}
