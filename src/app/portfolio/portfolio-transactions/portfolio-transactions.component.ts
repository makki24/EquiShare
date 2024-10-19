import {Component, OnDestroy, OnInit} from '@angular/core';
import {DetailService} from "../service/detail.service";
import {Subject} from "rxjs";
import {SubscriberComponent} from "../../shared/subscriber/subscriber.abstract.component";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {PortfolioTransaction} from "../model";

@Component({
  selector: 'app-portfolio-transactions',
  templateUrl: './portfolio-transactions.component.html',
  styleUrl: './portfolio-transactions.component.scss'
})
export class PortfolioTransactionsComponent extends SubscriberComponent implements OnInit{
  portfolioId: number;
  transactions: PortfolioTransaction[];

  constructor(private detailService: DetailService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
   this.portfolioId = +this.route.snapshot.paramMap.get('id')!;
   this.detailService
     .getTransactions(this.portfolioId)
     .pipe(
       takeUntil(this.destroy$),
     )
     .subscribe(res => {
       this.transactions = res;
     })
  }

}
