import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {DecimalPipe, NgForOf} from "@angular/common";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Subject, takeUntil} from "rxjs";
import {PortfolioService} from "./service/portfolio.service";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Portfolio} from "./portfolio.model";

interface PortfolioForm {
  displayName: FormControl<string>
  portfolioCharge: FormControl<number>
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  providers: [PortfolioService]
})
export class PortfolioComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  private destroy$: Subject<void> = new Subject<void>();
  portfolios: Portfolio[] = [];
  portfolioForm: FormGroup<PortfolioForm>;

  constructor(private modalService: BsModalService, private portfolioService: PortfolioService, private fb: FormBuilder,) {
    this.portfolioForm = this.fb.group({
      displayName: ['', Validators.required],
      portfolioCharge: [0, Validators.required]
    });
  }

  openPortfolioModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.portfolioService.getPortfolios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.portfolios = response;
        }
      });
  }

  onSubmitPortfolio() {
    if (this.portfolioForm.valid) {
      const newPortfolio = this.portfolioForm.getRawValue();
      this.portfolioService
        .createPortfolios(newPortfolio)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.portfolios.push(response);
            this.modalRef?.hide();
          }
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
