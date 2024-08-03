import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserViewComponent } from '../../components/user-view/user-view.component';
import { UserService } from '../../services/user.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserFormControls, UserFormValue } from '../../models/user-form.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  host: {
    class: 'd-flex w-100 h-50',
  },
  imports: [UserViewComponent, ReactiveFormsModule, NgClass],
  providers: [UserService],
})
export class UserFormComponent implements OnInit {
  userFormGroup!: FormGroup<UserFormControls>;
  submitted: boolean = false;

  @Input() set formValue(value: UserFormValue | null) {
    if (!value) return;
    this.userFormGroup.patchValue(value);
  }
  loading = input(false);

  @Output() onSubmit = new EventEmitter<UserFormValue>();

  get formControls() {
    return this.userFormGroup.controls;
  }
  constructor() {}

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userFormGroup = new FormGroup<UserFormControls>({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      avatar: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submitFormValue() {
    this.submitted = true;
    const { valid } = this.userFormGroup;
    if (!valid) return;
    this.onSubmit.emit(this.userFormGroup.getRawValue());
  }
}
