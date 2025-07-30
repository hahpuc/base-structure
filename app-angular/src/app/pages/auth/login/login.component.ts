import { ToastService } from '@/app/shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: this.loginForm.get('rememberMe')?.value,
      };

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Show success message
        this.toastService.success('Login Successful', 'Welcome back!');
        // Navigate to dashboard on successful login
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.markFormGroupTouched();
      this.showValidationErrors();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onGoogleLogin(): void {
    // Implement Google OAuth login
    console.log('Google login clicked');
    this.toastService.info('Google Login', 'Google OAuth not implemented yet');
  }

  onAppleLogin(): void {
    // Implement Apple OAuth login
    console.log('Apple login clicked');
    this.toastService.info('Apple Login', 'Apple OAuth not implemented yet');
  }

  onForgotPassword(): void {
    // Navigate to forgot password page or show modal
    console.log('Forgot password clicked');
    this.toastService.info(
      'Forgot Password',
      'Forgot password functionality not implemented yet'
    );
  }

  navigateToSignUp(): void {
    this.router.navigate(['/auth/register']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  private showValidationErrors(): void {
    const emailError = this.getFieldError('email');
    const passwordError = this.getFieldError('password');

    if (emailError) {
      this.toastService.error('Validation Error', emailError);
    } else if (passwordError) {
      this.toastService.error('Validation Error', passwordError);
    } else {
      this.toastService.error(
        'Validation Error',
        'Please check your input fields.'
      );
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.valid && field?.touched);
  }
}
