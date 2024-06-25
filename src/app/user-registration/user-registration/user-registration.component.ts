import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,  private snackbarService: SnackbarService ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  get username() { return this.registrationForm.get('username')!; }
  get email() { return this.registrationForm.get('email')!; }
  get password() { return this.registrationForm.get('password')!; }
  get confirmPassword() { return this.registrationForm.get('confirmPassword')!; }

  passwordMatchValidator(form: FormGroup) {
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

  onSubmit(): void {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      console.log('Form Data: ', this.registrationForm.value);
      this.snackbarService.openSuccess('Registration successful!');
    }
  }
}
