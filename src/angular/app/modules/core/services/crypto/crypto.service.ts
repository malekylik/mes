import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class CryptoService {

  private crypto = null;

  constructor(private electronService: ElectronService) {
    this.crypto = this.electronService.remote.require('crypto');
  }

  generateHash(s: string): string {
    return this.crypto.createHash('sha256').update(s).digest('hex');
  }
}
