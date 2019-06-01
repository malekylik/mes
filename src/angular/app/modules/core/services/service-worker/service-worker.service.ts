import { Injectable } from '@angular/core';

import { CHANNEL_NAME } from 'src/angular/service-worker/constants';
import { SeriveWorkerEvents } from 'src/angular/service-worker/constants/events-type';

@Injectable()
export class ServiceWorkerService {

  private sw: Worker = null;
  private channel: BroadcastChannel = new BroadcastChannel(CHANNEL_NAME);

  private isInit: boolean = false;
  private init: Promise<boolean>;

  constructor() {
    this.init = new Promise((resolve, reject) => {
      const onmessage = ({ data }) => {
        if (data.type === SeriveWorkerEvents.init) {
        resolve(data.isInit);

        this.channel.removeEventListener('message', onmessage);
      }
    };

    this.channel.addEventListener('message', onmessage);
  });
  this.init.then((isInit) => this.isInit = isInit);

  this.sw = new Worker('service-worker.js');
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
    });

    if (this.isInit) {
      this.channel.postMessage({ type, data });

      return action;
    }

    return this.init.then(_ => {
      this.channel.postMessage({ type, data });

      return action;
    });
  }
}
