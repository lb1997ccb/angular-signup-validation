import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  /**
   * Constructor for UserRegistrationComponent.
   * @param fb FormBuilder for creating reactive forms.
   * @param snackbarService Service for displaying snackbar notifications.
   */
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
  ) {}

  /**
   * Initializes the registration form with validators and password confirmation validation.
   */
  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordConfirmationValidator },
    );
  }

  /**
   * Getter for username form control.
   * @returns Username form control.
   */
  get username() {
    return this.registrationForm.get('username')!;
  }

  /**
   * Getter for email form control.
   * @returns Email form control.
   */
  get email() {
    return this.registrationForm.get('email')!;
  }

  /**
   * Getter for password form control.
   * @returns Password form control.
   */
  get password() {
    return this.registrationForm.get('password')!;
  }

  /**
   * Getter for confirmPassword form control.
   * @returns ConfirmPassword form control.
   */
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')!;
  }

  /**
   * Custom validator function to check if password and confirmPassword match.
   * @param form FormGroup instance containing password and confirmPassword controls.
   */
  passwordConfirmationValidator(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;

    // Check if confirmPassword is empty and mark it as required
    if (confirmPassword === '') {
      form.get('confirmPassword')!.setErrors({ required: true });
    } else {
      // Check if the passwords match
      if (password !== confirmPassword) {
        form.get('confirmPassword')!.setErrors({ mismatch: true });
      } else {
        form.get('confirmPassword')!.setErrors(null);
      }
    }
  }

  /**
   * Handles form submission and displays success message if form is valid.
   */
  onSubmit(): void {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      console.log('Form Data: ', this.registrationForm.value);
      this.snackbarService.openSuccess('Registration successful!');
    }
  }
}
