import { FormControl } from '@angular/forms';

export interface LoginFormValue {
  email: string | null;
  password: string | null;
}

export interface LoginFormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
