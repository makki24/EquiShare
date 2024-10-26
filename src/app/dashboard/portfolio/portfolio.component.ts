import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from './service/portfolio.service';
import { Portfolio } from '../../shared/portfolio/portfolio.model';

interface PortfolioForm {
  displayName: FormControl<string>;
  portfolioCharge: FormControl<number>;
  userPortfolioResponses: FormControl<null>;
  shares: FormControl<null>;
  totalValue: FormControl<number>
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  providers: [PortfolioService],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  private destroy$: Subject<void> = new Subject<void>();
  portfolios: Portfolio[] = [];
  portfolioForm: FormGroup<PortfolioForm>;
  selectedPortfolio: Portfolio | null = null;
  errorMessage: string | null = null; // To hold any error messages

  constructor(
    private modalService: BsModalService,
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private router: Router // Inject Router for navigation
  ) {
    this.portfolioForm = this.fb.group({
      displayName: ['', Validators.required],
      portfolioCharge: [0, Validators.required],
      shares: [null],
      userPortfolioResponses: [null],
      totalValue: [0]
    });
  }

  getPortfolios() {
    this.portfolioService.getPortfolios().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.portfolios = response;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load portfolios';
      },
    });
  }

  ngOnInit() {
    this.getPortfolios();
  }

  openPortfolioModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.errorMessage = null; // Clear any previous error messages
  }

  openDeleteModal(template: TemplateRef<any>, portfolio: Portfolio) {
    this.selectedPortfolio = portfolio;
    this.modalRef = this.modalService.show(template);
    this.errorMessage = null; // Clear any previous error messages
  }

  onSubmitPortfolio(response) {
    this.portfolios.push(response);
    this.modalRef?.hide();
  }

  clone(id: number) {
    this.portfolioService.clonePortfolio(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.modalRef?.hide();
        this.getPortfolios();
        this.errorMessage = null; // Clear any error on success
      },
      error: (error) => {
        this.errorMessage = error.message
      },
    });
  }

  onDeletePortfolio() {
    if (this.selectedPortfolio) {
      this.portfolioService.deletePortfolio(this.selectedPortfolio.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.portfolios = this.portfolios.filter(p => p.id !== this.selectedPortfolio?.id);
          this.modalRef?.hide();
          this.errorMessage = null; // Clear any error on success
        },
        error: (error) => {
          this.errorMessage = error.message
        },
      });
    }
  }

  navigateToPortfolioDetails(portfolioId: number) {
    this.router.navigate(['/portfolio', portfolioId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
