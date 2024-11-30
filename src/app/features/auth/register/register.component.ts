import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth/auth.service';
import { Role } from '../../../shared/models/enums/Role';
import { RegistrationRequest } from '../../../shared/models/Auth/RegistrationRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder)
  router = inject(Router)
  authService = inject(AuthService)

  username: FormControl = new FormControl('', Validators.required);
  fullname: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', Validators.required);
  confirmPassword: FormControl = new FormControl('', Validators.required);

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { PasswordNoMatch: true };
  };

  registerForm = this.formBuilder.nonNullable.group({
    username: this.username,
    fullname: this.fullname,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword
  }, { validators: [this.passwordMatchValidator] });

  onSubmit() {
    try {
      if (!this.registerForm.valid) {
        alert('Password and Confirm Password do not match');
      } else {
        const { confirmPassword, ...rest } = this.registerForm.value;
        this.authService.register({ role: Role.Customer, ...rest } as RegistrationRequest).subscribe({
          next: (res) => {
            console.log(res);
            alert(res.msg + "Please login to continue");
            //this.router.navigateByUrl('/login');
          },
          error: (err) => {
            console.log(err);
            alert(err.error);
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  registerWithFacebook() {
    console.log('Register with Facebook');
    // Implement Facebook registration logic
  }

  registerWithGoogle() {
    console.log('Register with Google');
    // Implement Google registration logic
  }
}