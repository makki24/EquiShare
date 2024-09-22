import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {NgIf} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "./service/auth.service";

@NgModule({ declarations: [
        LoginComponent,
        SignUpComponent,
        ForgotPasswordComponent
    ],
    exports: [
        LoginComponent
    ], imports: [ReactiveFormsModule,
        NgIf,
        AuthRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi()), AuthService] })
export class AuthModule { }
