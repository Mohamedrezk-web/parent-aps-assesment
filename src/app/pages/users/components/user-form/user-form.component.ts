import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserViewComponent } from '@app/pages/users/components';
import { UserService } from '@app/pages/users/services/user.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserFormControls, UserFormValue } from '@app/pages/users/models';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  host: {
    class: 'd-flex w-100 h-50',
  },
  imports: [UserViewComponent, ReactiveFormsModule, NgClass, RouterLink],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  userFormGroup!: FormGroup<UserFormControls>;
  submitted: boolean = false;

  @Input() set formValue(value: UserFormValue | null) {
    this.initUserForm();
    if (!value) return;
    this.userFormGroup.patchValue(value);
  }
  loading = input(false);

  @Output() onSubmit = new EventEmitter<UserFormValue>();

  get formControls() {
    return this.userFormGroup.controls;
  }
  constructor() {}

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(id = null) {
    if (this.userFormGroup) return;
    this.userFormGroup = new FormGroup<UserFormControls>({
      id: new FormControl(id),
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
