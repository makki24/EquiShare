import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NgIf} from "@angular/common";

@NgModule({
  imports: [NgIf],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class SharedModule {

}
