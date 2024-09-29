import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from './service/users.service';
import { UserForm } from './user.model';
import { Router } from '@angular/router';
import {User} from "../../shared/users/user.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersService]
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  modalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;  // Modal reference for delete confirmation
  selectedUserId?: number; // To store the selected user for deletion
  users: User[] = [];
  userForm: FormGroup<UserForm>;
  errorMessage: string | null = null; // Error message

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private usersService: UsersService,
    private router: Router // Inject Router for navigation
  ) {
    // Initialize form controls
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      currentAmount: [0, Validators.required],
      enabled: [false],
      password: ["dummy"],
      userPortfolios:[null],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  // Load Users
  loadUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.users = value;
        this.errorMessage = null; // Clear error if successful
      },
      error: () => {
        this.errorMessage = 'Failed to load users. Please try again.';
      }
    });
  }

  // Submit User Form
  onSubmitUser() {
    if (this.userForm.valid) {
      const newUser = this.userForm.getRawValue();
      this.usersService.createUser(newUser ).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.users.push(response);
          this.modalRef?.hide();
          this.errorMessage = null; // Clear error on success
        },
        error: () => {
          this.errorMessage = 'Failed to create user. Please try again.';
        }
      });
    }
  }

  // Open User Modal
  openUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.errorMessage = null; // Clear any previous error messages
  }

  // Open Delete Modal
  openDeleteModal(template: TemplateRef<any>, userId: number) {
    this.selectedUserId = userId;
    this.deleteModalRef = this.modalService.show(template);
  }

  // Delete User
  deleteUser() {
    if (this.selectedUserId) {
      this.usersService.deleteUser(this.selectedUserId).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== this.selectedUserId);
          this.deleteModalRef?.hide();
          this.errorMessage = null;
        },
        error: () => {
          this.errorMessage = 'Failed to delete user. Please try again.';
        }
      });
    }
  }

  // Navigate to specific user details
  goToUserDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
