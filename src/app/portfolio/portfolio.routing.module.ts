import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PortfolioDetailsComponent} from "./portfolio-details/portfolio-details.component";

const routes: Routes = [
  { path: ':id', component: PortfolioDetailsComponent }, // Route for portfolio details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
