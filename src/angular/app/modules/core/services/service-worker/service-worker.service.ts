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
    if (this.sw) {
      return new Promise((resolve, reject) => {

        this.channel.onmessage = (event) => {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };

        this.channel.postMessage({ type, data });
      });
    }

    return Promise.resolve(null);
  }
}
