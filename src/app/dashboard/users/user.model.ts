import {FormControl} from "@angular/forms";

export interface UserForm {
  username: FormControl<string>;
  displayName: FormControl<string>;
  currentAmount: FormControl<number>;
  enabled: FormControl<boolean>;
  password: FormControl<string>;
  userPortfolios: FormControl<null>
}
