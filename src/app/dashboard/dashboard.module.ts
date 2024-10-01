import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {DashboardService} from "./service/dashboard.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {UsersComponent} from "./users/users.component";
import {PortfolioModule} from "../shared/portfolio/portfolio.module";

@NgModule({
  declarations: [DashboardComponent, PortfolioComponent, UsersComponent],
    imports: [DashboardRoutingModule, DecimalPipe, NgForOf, ReactiveFormsModule, NgIf, PortfolioModule],
  providers: [DashboardService, provideHttpClient(withInterceptorsFromDi())]
})
export class DashboardModule { }
