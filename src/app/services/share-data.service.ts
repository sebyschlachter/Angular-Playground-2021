import { CoinInfo } from './../models/CoinInfo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  public coin$ = new BehaviorSubject<string>(undefined);
  public coinSelected$ = new BehaviorSubject<string>(undefined);
  constructor() {}

  public getCoin(): Observable<string> {
    return this.coin$.asObservable();
  }
  public getCoinSelected(): Observable<string> {
    return this.coinSelected$.asObservable();
  }
}
