import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DecimalPipe, NgForOf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DashboardService} from "../service/dashboard.service";
import {User, UserForm} from "./user.model";
import {UsersService} from "./service/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersService]
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;
  users: User[];
  userForm: FormGroup<UserForm>;


  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private usersService: UsersService
  ) {
    // Initialize form controls
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      currentAmount: [0, Validators.required],
      enabled: [false]
    });
  }

  ngOnInit() {
    this.usersService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: value => {
          this.users = value;
        }
      })
  }

  // Submit User Form
  onSubmitUser() {
    if (this.userForm.valid) {
      const newUser = this.userForm.getRawValue();
      this.usersService.createUser({...newUser, password: 'dummy'})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.users.push(response);
            this.modalRef?.hide();
          }
        })

    }
  }

  // Open User Modal
  openUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
