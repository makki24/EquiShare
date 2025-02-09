import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/AuthInterceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        SharedModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
