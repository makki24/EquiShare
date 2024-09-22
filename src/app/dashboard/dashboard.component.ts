import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { DashboardService } from "./service/dashboard.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;

  portfolios = [];
  users = [
    { username: 'john_doe', displayName: 'John Doe', currentAmount: 15000 },
    { username: 'jane_doe', displayName: 'Jane Doe', currentAmount: 30000 }
  ];

  userForm: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    // Initialize form controls


    this.userForm = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      currentAmount: [0, Validators.required]
    });
  }

  ngOnInit(): void {

  }


  // Submit Portfolio Form




  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
