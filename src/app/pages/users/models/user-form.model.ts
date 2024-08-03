import { FormControl } from '@angular/forms';

export interface UserFormValue {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar: string | File | null;
}

export interface UserFormControls {
  first_name: FormControl<string | null>;
  last_name: FormControl<string | null>;
  email: FormControl<string | null>;
  avatar: FormControl<string | File | null>;
  id: FormControl<number | null>;
}
