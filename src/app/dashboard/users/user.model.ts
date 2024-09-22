import {FormControl} from "@angular/forms";

export interface User {
  username: string;
  displayName: string;
  password: string;
  enabled?: boolean;
  currentAmount: number;
}

export interface UserForm {
  username: FormControl<string>;
  displayName: FormControl<string>;
  currentAmount: FormControl<number>;
  enabled: FormControl<boolean>;
}
