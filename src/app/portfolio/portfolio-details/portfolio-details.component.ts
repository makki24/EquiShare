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
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.scss'
})
export class PortfolioDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;
  portfolio: PortfolioDetailResponse
  portfolioId: number;
  errorMessage: string | null = null; // To hold any error messages
  shares: ShareTransactions[] = [];
  userPortfolios: UserPortfolioResponse[] = [];
  contributionAmount: number;
  users: User[]
  selectedUser: number;
  amountToWithdraw: number;
  selectedUsertoWithdraw: number;

  constructor(private portfolioService: DetailService,
              private userService: UsersService,
              private modalService: BsModalService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.portfolioId = +this.route.snapshot.paramMap.get('id');
    this.loadPortfolioDetails();
    this.fetchUsers();
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

  openPortfolioEdit(template) {
    this.modalRef = this.modalService.show(template);
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

  openwithDrawAmountModal(template, selectedUser: UserPortfolioResponse) {
    this.selectedUsertoWithdraw = selectedUser.id;
    this.modalRef = this.modalService.show(template);
  }

  withDrawAmount() {
    this.portfolioService.withDrawAmount(this.portfolioId, this.selectedUsertoWithdraw, this.amountToWithdraw).subscribe({
      next: () => {
        this.loadPortfolioDetails();
        this.modalRef.hide();
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

  protected readonly self = self;
}
