import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {catchError, of, Subject, tap} from "rxjs";
import {debounceTime, switchMap, takeUntil} from "rxjs/operators";
import {SharesService} from "../service/shares.service";
import {ShareSearch, ShareTransactions} from "../../shared/portfolio/portfolio.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DetailService} from "../service/detail.service";

@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrl: './share-details.component.scss',
  providers: [SharesService]
})
export class ShareDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public stockResults: any[] = [];
  selectedStock: ShareSearch = {} as ShareSearch;
  user$ = new Subject<string>();
  loading = false;
  selectedShare: ShareTransactions;
  sellQuantity
  modalRef?: BsModalRef;
  shareAmount: number;
  quantity: number;
  errorMessage: string | null = null; // To hold any error messages
  isSelect
  charges: number;

  @Input() shares: ShareTransactions[] = [];
  @Input() totalShareValue: number;
  @Input() portfolioId: number;
  @Output() loadPortfolioDetailsEvent = new EventEmitter<void>();

  constructor(private sharesService: SharesService, private modalService: BsModalService, private portFolioService: DetailService) {
  }

  ngOnInit() {
    this.loadShares();
  }

  public toggle() {
    this.isSelect = !this.isSelect;
  }

  private loadShares() {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loading = true),
        debounceTime(300),  // Wait for user to stop typing
        switchMap((query) =>
          this.sharesService.searchShares(query)
            .pipe(
              catchError(e => of([]))
            )
        ), // Call the search service

      )
      .subscribe((data) => {
        this.stockResults = data; // Update the dropdown results
        this.loading = false;
      });
  }

  loadPortfolioDetails() {
    this.loadPortfolioDetailsEvent.emit();
  }

  buyShares() {
    if (!this.shareAmount || !this.quantity || !this.selectedStock.commonName)
      return
    this.portFolioService.buyShares(this.portfolioId, this.shareAmount, this.quantity, this.selectedStock.commonName, this.charges).subscribe({
      next: () => {
        this.loadPortfolioDetails();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }

  updateShares( shareId, price, qty) {
    if (!price || !qty )
      return
    this.sharesService.updateShareQty(this.portfolioId, shareId, price, qty).subscribe({
      next: () => {
        this.loadPortfolioDetails();
        this.modalRef.hide();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }

  sellShares(portfolioId, shareId, sellprice, sellqty) {
    if (!sellprice || !sellqty )
      return
    if (!this.charges)
      this.charges = 0;
    this.sharesService.sellShares(portfolioId, shareId, sellprice, sellqty, this.charges).subscribe({
      next: () => {
        this.loadPortfolioDetails();
        this.modalRef.hide();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }

  updatePrice(id, amount) {
    this.sharesService.updateSharePrice(id, amount).subscribe({
      next: () => {
        this.loadPortfolioDetails();
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    })
  }

  openModifyOrderModal(share, template) {
    this.selectedShare = share;
    this.sellQuantity = this.selectedShare.qty
    this.modalRef = this.modalService.show(template);

  }


  openShareModal(share, template) {
    this.selectedShare = share;
    this.sellQuantity = this.selectedShare.qty;
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
