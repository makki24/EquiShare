import {NgModule} from "@angular/core";
import {PortfolioDetailsComponent} from "./portfolio-details/portfolio-details.component";
import {PortfolioRoutingModule} from "./portfolio.routing.module";
import {DetailService} from "./service/detail.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, DecimalPipe, NgClass} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {UsersService} from "../shared/users/user.service";
import {ShareDetailsComponent} from "./share-details/share-details.component";
import {PortfolioModule as AddPortfolioModule} from "../shared/portfolio/portfolio.module";
import {PortfolioTransactionsComponent} from "./portfolio-transactions/portfolio-transactions.component";
import {DatetimePipe} from "../shared/pipe/datetime.pipe";
import {UserTransactionsComponent} from "./user-transactions/user-transactions.component";

@NgModule({
  declarations: [PortfolioDetailsComponent, ShareDetailsComponent, PortfolioTransactionsComponent, UserTransactionsComponent],
    imports: [PortfolioRoutingModule, FormsModule, DecimalPipe, NgSelectModule, NgClass, AddPortfolioModule, DatetimePipe],
  providers: [DetailService, UsersService]
})
export class PortfolioModule { }
