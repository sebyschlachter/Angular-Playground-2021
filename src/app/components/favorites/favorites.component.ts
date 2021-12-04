import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  @Input() coins: any;
  favorites: Array<any> = [];
  favoriteIds = ['bitcoin', 'binance-usd', 'usd-coin'];
  myCoins: any = {
    "bitcoin": 2,
    "binance-usd": 3,
    "usd-coin": 5,
  };
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.setFavorites();
  }
  setFavorites(): void {
    this.favorites = this.coins.filter((coin: any) =>
      this.favoriteIds.includes(coin.id)
    );

    this.favorites.forEach((favorite): void => {
      favorite.my_currency = this.myCoins[favorite.id] * favorite.current_price;
    });
  }
}
