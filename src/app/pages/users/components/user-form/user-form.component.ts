import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UserViewComponent } from '@app/pages/users/components';
import { UserService } from '@app/pages/users/services/user.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserFormControls, UserFormValue } from '../../models/user-form.model';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  host: {
    class: 'd-flex w-100 h-50',
  },
  imports: [
    UserViewComponent,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    NgOptimizedImage,
  ],
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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('imgPreview') imgPreview!: ElementRef;

  @Output() onSubmit = new EventEmitter<UserFormValue>();

  renderer: Renderer2 = inject(Renderer2);
  get formControls() {
    return this.userFormGroup.controls;
  }

  get avatarValueType() {
    return typeof this.userFormGroup.controls.avatar.value;
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

  triggerFileInputClick() {
    this.fileInput?.nativeElement.click();
  }

  clearAvatarValue() {
    this.userFormGroup.controls.avatar.setValue(null);
  }

  onFileSelect(event: any) {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.userFormGroup.get('avatar')?.setValue(e.target.result);

        // Optional: Display a preview of the image
        this.renderer.setProperty(
          this.imgPreview.nativeElement,
          'src',
          e.target.result
        );
      };

      reader.onerror = () => {
        console.error('Error reading the image file.');
      };

      reader.readAsDataURL(file);
    } else {
      // Handle invalid file type
      this.userFormGroup.get('avatar')?.setErrors({ invalidType: true });
    }
  }

  submitFormValue() {
    this.submitted = true;
    const { valid } = this.userFormGroup;
    if (!valid) return;
    this.onSubmit.emit(this.userFormGroup.getRawValue());
  }
}
