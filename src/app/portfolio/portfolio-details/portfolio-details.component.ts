import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, switchMap, takeUntil} from "rxjs/operators";
import {DetailService} from "../service/detail.service";
import {ActivatedRoute} from "@angular/router";
import {Subject, tap} from "rxjs";
import {
  Portfolio,
  PortfolioDetailResponse,
  ShareTransactions,
  UserPortfolioResponse
} from "../../shared/portfolio/portfolio.model";
import {UsersService} from "../../shared/users/user.service";

import {User} from "../../shared/users/user.model";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.scss'
})
export class PortfolioDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  portfolio: PortfolioDetailResponse
  portfolioId: number;
  errorMessage: string | null = null; // To hold any error messages
  shares: ShareTransactions[] = [];
  userPortfolios: UserPortfolioResponse[] = [];
  shareAmount: number;
  quantity: number;
  contributionAmount: number;
  users: User[]
  selectedUser: number;
  public stockResults: any[] = [];
  selectedStock;
  user$ = new Subject<string>();
  loading = false;

  constructor(private portfolioService: DetailService,
              private userService: UsersService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.portfolioId = +this.route.snapshot.paramMap.get('id');
    this.loadPortfolioDetails();
    this.fetchUsers();
    this.loadShares();
  }

  private loadShares() {
    this.user$
      .pipe(
        tap(() => this.loading = true),
        debounceTime(300),  // Wait for user to stop typing
        switchMap((query) => this.portfolioService.searchShares(query)) // Call the search service
      )
      .subscribe((data) => {
        this.stockResults = data; // Update the dropdown results
        this.loading = false;
      });
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  loadPortfolioDetails() {
    this.portfolioService.getDetails(this.portfolioId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.shares = response.shares.map(share => {
          // Calculate the percentage change
          const percentageChange = ((share.currentPrice - share.buyingPrice) / share.buyingPrice) * 100;
          return {
            ...share,
            percentageChange: percentageChange
          };
        });
        this.portfolio = response;
        this.userPortfolios = response.userPortfolioResponses;
      },
      error: (error) => {
        this.errorMessage = error.error;
      },
    });
  }

  confirmDelete(id: number) {
    this.portfolioService.deleteUserFromPortfolio(this.portfolioId, id).subscribe({
      next: () => {
        this.loadPortfolioDetails();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }

  buyShares() {
    this.portfolioService.buyShares(this.portfolioId, this.shareAmount, this.quantity, this.selectedStock.commonName).subscribe({
      next: () => {
        this.loadPortfolioDetails();
      },
      error: (err) => {
        console.log("err", err)
        this.errorMessage = err.error;
      },
    });
  }

  addUserToPortfolio() {
    this.portfolioService.addUserToPortfolio(this.portfolioId, this.selectedUser, this.contributionAmount).subscribe({
      next: () => {
        this.loadPortfolioDetails();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
