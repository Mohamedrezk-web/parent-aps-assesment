import { FormControl } from '@angular/forms';

export interface LoginFormValue {
  user: string | null;
  password: string | null;
  shouldRememberUser: boolean;
}

export interface LoginFormControls {
  user: FormControl<string | null>;
  password: FormControl<string | null>;
  shouldRememberUser: FormControl<boolean | null>;
}
