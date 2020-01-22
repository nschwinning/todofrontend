import { Component, OnInit } from '@angular/core';
import { Amount } from '../domain/amount';
import { AmountService } from '../service/data/amount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-amounts',
  templateUrl: './list-amounts.component.html',
  styleUrls: ['./list-amounts.component.css']
})
export class ListAmountsComponent implements OnInit {

  amounts : Amount[];

  constructor(
              private amountService: AmountService,
              private router: Router
  ) { }

  ngOnInit() {
    this.refreshAmounts();
  }

  refreshAmounts() {
    this.amountService.retrieveAllAmounts()
        .subscribe(response => {
            this.amounts=response;
        })
  }

  createAmount() {
    this.router.navigate(['amounts', -1]);
  }

}
