import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from './../../models/Transaction';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  displayedColumns: string[] = [
    'info',
    'id',
    'data',
    'method',
    'coinSymbol',
    'price',
    'amount',
    'totalPrice',
  ];
  dataSource = new MatTableDataSource<Transaction>();
  public transactionArray: any =
    JSON.parse(localStorage.getItem('transactions')) || [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteAll() {
    localStorage.removeItem('transactions');
    this.dataSource.data = [];
  }
  delete(el: any) {
    this.transactionArray.forEach((element: any, index: number) => {
      if (element.id == el.id) {
        console.log('gasit: ' + index);
        this.transactionArray.splice(index, 1);
        localStorage.removeItem('transactions');
        localStorage.setItem(
          'transactions',
          JSON.stringify(this.transactionArray)
        );
        this.dataSource.data = this.transactionArray;
      }
    });
  }
  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.transactionArray;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
