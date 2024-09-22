import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DecimalPipe, NgForOf} from "@angular/common";

@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, DecimalPipe, NgForOf]
})
export class DashboardModule { }
