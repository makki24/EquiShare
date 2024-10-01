import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Portfolio} from "./portfolio.model";
import {PortfolioService} from "./portfolio.service";

interface PortfolioForm {
  id: FormControl<number>;
  displayName: FormControl<string>;
  portfolioCharge: FormControl<number>;
  totalValue: FormControl<number>
}



@Component({
  selector: "app-add-portfolio",
  template : `
    <div class="modal-header">
      <h4 class="modal-title">
        @if (portfolio) {
          Edit Portfolio
        } @else {
          Add Portfolio
        }
      </h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="closeModal.emit()">
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="portfolioForm" (ngSubmit)="onSubmitPortfolio()">
        <div class="form-group">
          <label for="portfolioName">Portfolio Name</label>
          <input id="portfolioName" class="form-control" formControlName="displayName" required>
        </div>
        <div class="form-group">
          <label for="totalCharge">Total charge</label>
          <input id="totalCharge" class="form-control" formControlName="portfolioCharge" required type="number">
        </div>
        <!-- Error message -->
        @if (errorMessage) {
          <div class="alert alert-danger mt-3">
            {{ errorMessage }}
          </div>
        }
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `
})
export class AddPortfolioComponent implements OnInit {
  errorMessage: string
  portfolioForm: FormGroup<PortfolioForm>;

  @Input() portfolio: Portfolio

  @Output() onSuccess = new EventEmitter<Portfolio | null>();
  @Output() closeModal = new EventEmitter();

  constructor(private portfolioService: PortfolioService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.portfolioForm = this.fb.group({
      id: [this.portfolio?.id ?? undefined],
      displayName: [this.portfolio?.displayName ?? '', Validators.required],
      portfolioCharge: [this.portfolio?.portfolioCharge ?? 0, Validators.required],
      totalValue: [this.portfolio?.totalValue ?? 0]
    })
  }

  onSubmitPortfolio() {
    if (this.portfolioForm.valid) {
      const newPortfolio = this.portfolioForm.getRawValue();
      this.portfolioService.createPortfolios(newPortfolio).subscribe({
        next: (response) => {
          this.onSuccess.emit(response);
          this.errorMessage = null; // Clear any error on success
        },
        error: (error) => {
          this.errorMessage = error.getMessage();
        },
      });
    }
  }

}
