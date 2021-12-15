import { ShareDataService } from './../../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinInfo } from 'src/app/models/CoinInfo';
import { CoinsService } from 'src/app/services/coins.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  public coinId: string[];
  public status: number;
  public budget: number;
  public coins$: Observable<CoinInfo[]>;
  public selectedCoin: number = 0;
  public totalCost: number = 0;
  public overPrice: boolean = false;
  public amount: number;
  public coinName: string;
  public coinSymbol: string;
  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService
  ) {}

  ngOnInit(): void {
    this.sharedData.getBudget().subscribe((currentBudget) => {
      this.status = currentBudget;
      this.budget = currentBudget;
    });
    this.coins$ = this.coinService.getCoins();
  }

  calculateTotalPrice(evt: any) {
    this.amount = +evt.value;
    this.totalCost = this.selectedCoin * +this.amount;
    this.overPrice = this.totalCost > this.budget;
  }

  resetValues(ev: any) {
    this.totalCost = 0;
    this.overPrice = false;
    this.amount = 0;
    this.coinName = ev.source.selected.viewValue;
    this.coinService.getCoins().subscribe((data: CoinInfo[]) => {
      data.forEach((element: CoinInfo) => {
        if (element.id == this.coinName) {
          this.coinSymbol = element.symbol;
        }
      });
    });
  }

  buy() {
    if (!this.overPrice) {
      this.budget = this.budget - this.totalCost;
    }
    let transactionArray: any =
      JSON.parse(localStorage.getItem('transactions')) || [];
    let id: number;
    let maxId = Math.max.apply(
      Math,
      transactionArray.map(function (o: any) {
        return o.id;
      })
    );
    if (transactionArray.length == 0) {
      id = 1;
    } else {
      id = maxId + 1;
    }
    const transaction = {
      id: id,
      data: new Date().toLocaleString(),
      method: 'BUY',
      coinSymbol: this.coinSymbol.toUpperCase(),
      price: this.selectedCoin,
      amount: this.amount,
      totalPrice: this.totalCost,
    };
    transactionArray.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactionArray));
  }
  sell() {
    this.budget = this.budget + this.totalCost;
    let transactionArray: any =
      JSON.parse(localStorage.getItem('transactions')) || [];
    let id: number;
    let maxId = Math.max.apply(
      Math,
      transactionArray.map(function (o: any) {
        return o.id;
      })
    );
    if (transactionArray.length == 0) {
      id = 1;
    } else {
      id = maxId + 1;
    }
    const transaction = {
      id: id,
      data: new Date().toLocaleString(),
      method: 'SELL',
      coinSymbol: this.coinSymbol.toUpperCase(),
      price: this.selectedCoin,
      amount: this.amount,
      totalPrice: this.totalCost,
    };
    transactionArray.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactionArray));
  }
}
