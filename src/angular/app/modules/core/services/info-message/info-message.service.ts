import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ERROR_SNACKBAR_DURATION } from '../../constants';

@Injectable()
export class InfoMessageService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(messageText: string, duration: number = ERROR_SNACKBAR_DURATION): void {
    this.snackBar.open(messageText, '', { duration });
  }
}
