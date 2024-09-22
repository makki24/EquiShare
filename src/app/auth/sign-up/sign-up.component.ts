import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      displayName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, password, displayName } = this.signupForm.value;
      this.authService.signup(username, password, displayName).subscribe({
        next: (response) => {
          this.successMessage = 'Account created successfully';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Error creating account';
          this.successMessage = '';
        }
      });
    }
  }
}
