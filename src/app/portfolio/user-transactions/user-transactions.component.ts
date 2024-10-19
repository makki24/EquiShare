import {Component, OnInit} from '@angular/core';
import {SubscriberComponent} from "../../shared/subscriber/subscriber.abstract.component";
import {takeUntil} from "rxjs/operators";
import {DetailService} from "../service/detail.service";
import {ActivatedRoute} from "@angular/router";
import {UserTransaction} from "../model";

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.scss'
})
export class UserTransactionsComponent extends SubscriberComponent implements OnInit {
  constructor(private detailService: DetailService, private route: ActivatedRoute) {
    super();
  }

  userId: number;
  portfolioId: number
  transactions: UserTransaction[];

  ngOnInit() {
    this.portfolioId = +this.route.snapshot.paramMap.get('id')!;
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    this.detailService
      .getUserTransactions(this.portfolioId, this.userId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        this.transactions = res;
      })
  }


}
