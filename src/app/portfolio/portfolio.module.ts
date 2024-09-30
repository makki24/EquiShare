import {NgModule} from "@angular/core";
import {PortfolioDetailsComponent} from "./portfolio-details/portfolio-details.component";
import {PortfolioRoutingModule} from "./portfolio.routing.module";
import {DetailService} from "./service/detail.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, DecimalPipe, NgClass} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {UsersService} from "../shared/users/user.service";
import {ShareDetailsComponent} from "./share-details/share-details.component";

@NgModule({
  declarations: [PortfolioDetailsComponent, ShareDetailsComponent],
    imports: [PortfolioRoutingModule, FormsModule, DecimalPipe, NgSelectModule, NgClass],
  providers: [DetailService, UsersService]
})
export class PortfolioModule { }
