import { FormControl } from '@angular/forms';

export interface UserFormValue {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar: string | null;
}

export interface UserFormControls {
  first_name: FormControl<string | null>;
  last_name: FormControl<string | null>;
  email: FormControl<string | null>;
  avatar: FormControl<string | null>;
}
