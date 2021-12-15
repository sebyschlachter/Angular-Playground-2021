import { CoinInfo } from './../../models/CoinInfo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() coin!: CoinInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
