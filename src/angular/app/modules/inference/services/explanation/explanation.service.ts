import { Injectable } from '@angular/core';

import { DiagnosisInfo } from 'src/electron/interfaces/DiagnosisInfo';
import { CriterionWeghtMap } from '../../consts/consts';

@Injectable()
export class ExplanationService {
  getProbobition(data: Record<string, DiagnosisInfo[]>): number {
    const keys = Object.keys(data);

    const probobition = keys.reduce((prev, key) => prev + Number(data[key].length > 0) * CriterionWeghtMap[key], 0)

    return probobition;
  }

  getStringProbobition(probobition: number): string {
    if (this.isVeryHigh(probobition)) {
      return 'очень высокий';
    }

    if (this.isHigh(probobition)) {
      return 'высокий';
    }

    if (this.isMiddle(probobition)) {
      return 'средний';
    }

    return 'мало';
  }

  isLow(probobition: number): boolean {
    return probobition < 25;
  }

  isMiddle(probobition: number): boolean {
    return probobition >= 25 && probobition < 50;
  }

  isHigh(probobition: number): boolean {
    return probobition >= 50 &&  probobition < 75;
  }

  isVeryHigh(probobition: number): boolean {
    return probobition >= 75;
  }
}
