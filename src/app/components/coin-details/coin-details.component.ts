import { ShareDataService } from './../../services/share-data.service';
import { CoinInfo } from './../../models/CoinInfo';
import { CoinsService } from './../../services/coins.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css'],
})
export class CoinDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'info',
    'image',
    'name',
    'current_price',
    'symbol',
    'last_updated',
    'favorites',
    'selected',
  ];
  dataSource = new MatTableDataSource<CoinInfo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public setFavorite(element: CoinInfo): void {
    if (this.favoritesSet.has(element.id)) {
      this.favoritesSet.delete(element.id);
      this.sharedData.coin$.next(undefined);
      console.log('deleted');
    } else {
      this.favoritesSet.add(element.id);
      this.sharedData.coin$.next(element.id);
      console.log('added');
      console.log(this.sharedData.coin$);
    }
  }

  public setCoinSelected(element: CoinInfo): void {
    if (this.coinSelectedSet.has(element.id)) {
      this.coinSelectedSet.delete(element.id);
      this.sharedData.coinSelected$.next(undefined);
      console.log('deleted');
    } else {
      this.coinSelectedSet.add(element.id);
      this.sharedData.coinSelected$.next(element.id);
      console.log('added');
    }
  }

  public favoritesSet = new Set<string>();
  public coinSelectedSet = new Set<string>();
  constructor(
    private coinService: CoinsService,
    private sharedData: ShareDataService
  ) {}

  ngOnInit(): void {
    this.coinService.getCoins().subscribe((data: CoinInfo[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
