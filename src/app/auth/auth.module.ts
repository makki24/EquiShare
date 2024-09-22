import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
    AuthRoutingModule
  ],
  providers: [],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
