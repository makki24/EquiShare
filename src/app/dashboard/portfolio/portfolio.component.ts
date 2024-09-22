import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from './service/portfolio.service';
import { Portfolio } from './portfolio.model';

interface PortfolioForm {
  displayName: FormControl<string>;
  portfolioCharge: FormControl<number>;
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

  constructor(
    private modalService: BsModalService,
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private router: Router // Inject Router for navigation
  ) {
    this.portfolioForm = this.fb.group({
      displayName: ['', Validators.required],
      portfolioCharge: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.portfolioService.getPortfolios().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.portfolios = response;
      },
    });
  }

  openPortfolioModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDeleteModal(template: TemplateRef<any>, portfolio: Portfolio) {
    this.selectedPortfolio = portfolio; // Store the selected portfolio to delete
    this.modalRef = this.modalService.show(template);
  }

  onSubmitPortfolio() {
    if (this.portfolioForm.valid) {
      const newPortfolio = this.portfolioForm.getRawValue();
      this.portfolioService.createPortfolios(newPortfolio).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.portfolios.push(response);
          this.modalRef?.hide();
        },
      });
    }
  }

  onDeletePortfolio() {
    if (this.selectedPortfolio) {
      this.portfolioService.deletePortfolio(this.selectedPortfolio.id).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.portfolios = this.portfolios.filter(p => p.id !== this.selectedPortfolio?.id);
          this.modalRef?.hide();
          this.selectedPortfolio = null;
        },
      });
    }
  }

  navigateToPortfolioDetails(portfolioId: number) {
    this.router.navigate(['/portfolio', portfolioId]); // Navigate to the portfolio details page
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
