import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  public coinId: string;

  constructor(private sharedData: ShareDataService) {}

  ngOnInit(): void {
    this.sharedData.getCoinSelected().subscribe((coinId) => {
      this.coinId = coinId;
    });
  }
}
