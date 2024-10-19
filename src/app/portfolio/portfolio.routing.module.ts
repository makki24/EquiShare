import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PortfolioDetailsComponent} from "./portfolio-details/portfolio-details.component";
import {PortfolioTransactionsComponent} from "./portfolio-transactions/portfolio-transactions.component";
import {UserTransactionsComponent} from "./user-transactions/user-transactions.component";

const routes: Routes = [
  { path: ':id', component: PortfolioDetailsComponent }, // Route for portfolio details
  { path: ':id/portfoliotransactions', component: PortfolioTransactionsComponent }, // Route for portfolio details
  { path: ':id/usertransactions/:userId', component: UserTransactionsComponent }, // Route for portfolio details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
