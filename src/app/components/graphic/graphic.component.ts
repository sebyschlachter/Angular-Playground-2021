import { BrowserModule } from '@angular/platform-browser';
import { ChartData } from './../../models/ChartData';
import { CoinsService } from './../../services/coins.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { switchMap } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { state } from '@angular/animations';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphicComponent implements OnInit {
  public hours: string[] = [];
  public coinValues: number[] = [];
  public updateOptions: {
    [key: string]:
      | { [key: string]: string | number[] | number | string[] | boolean }
      | [{ [key: string]: string | number[] }];
  };
  public isChecked: boolean = false;
  public coinId: string;
  public options: any =
    /*{[key:string]:{[key:string]:string | string[] | boolean | {[key:string]:boolean}} 
  | [{[key:string]:string | number[] | number | string[]}] 
  | {[key:string]:string | number}  }*/
    {
      title: {
        text: 'Coin',
        x: 'left',
      },
      legend: {
        data: ['Price'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.hours,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Price',
          type: 'bar',
          data: this.coinValues,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  constructor(
    private shareData: ShareDataService,
    private coinService: CoinsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /*this.shareData.getSelectedCoin().subscribe(id => {
      console.log(id);
    })
    this.coinService.getHistoryDataForCoin('bitcoin').subscribe((chartData:ChartData)=>{
      console.log(chartData);
    })*/
    this.shareData
      .getSelectedCoin()
      .pipe(
        switchMap((coinId) => {
          this.coinId = coinId;
          return this.coinService.getHistoryDataForCoin(coinId);
        })
      )
      .subscribe((chartData: ChartData) => {
        this.formatChartData(chartData);
        this.updateOptions = {
          title: {
            text: this.coinId,
            x: 'left',
          },
          xAxis: {
            data: this.hours,
          },
          yAxis: {
            scale: true,
          },
          series: [
            {
              data: this.coinValues,
              type: this.getChartType(),
            },
          ],
        };
      });
  }
  private formatChartData(chartData: ChartData) {
    this.hours = [];
    this.coinValues = [];
    for (let i = 0; i < chartData.prices.length; i++) {
      const price = chartData.prices[i];
      const priceTime = new Date(price[0]);
      const value = price[1].toFixed(2);

      this.hours.push(priceTime.toLocaleString());
      this.coinValues.push(+value);
    }
    this.cdr.markForCheck();
  }
  getChartType(): string {
    if (this.isChecked === true) {
      return 'bar';
    } else {
      return 'line';
    }
  }
  changeChartType(event: MatSlideToggleChange): void {
    this.updateOptions = {
      xAxis: {
        data: this.hours,
      },
      yAxis: {
        scale: true,
      },
      series: [
        {
          data: this.coinValues,
          type: this.getChartType(),
        },
      ],
    };
  }
}
