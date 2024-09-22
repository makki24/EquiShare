import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { username } = this.forgotPasswordForm.value;
      this.authService.forgotPassword(username)
        .subscribe({
          next: (response) => {
            this.message = 'Password reset link has been sent to your email';
          },
          error: (err) => {
            this.message = 'Error sending reset link';
          }
        });
    }
  }
}

