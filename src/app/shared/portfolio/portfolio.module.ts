import {NgModule} from "@angular/core";
import {AddPortfolioComponent} from "./add-portfolio.component";
import {PortfolioService} from "./portfolio.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AddPortfolioComponent],
  imports: [
    ReactiveFormsModule
  ],
  exports: [
    AddPortfolioComponent
  ],
  providers: [PortfolioService]
})
export class PortfolioModule { }
