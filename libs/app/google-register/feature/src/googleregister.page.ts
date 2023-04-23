import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '@mp/app/register/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-register-page',
  templateUrl: './googleregister.page.html',
  styleUrls: ['./googleregister.page.scss'],
})


export class GoogleRegisterPage {

  
  @Select(actionsExecuting([Register])) busy$!: Observable<ActionsExecuting>;
  registerForm = this.fb.group({
    firstName: [ '', [ Validators.maxLength(64)],],
    lastName: [ '', [ Validators.maxLength(64)],],
    gender: [ '', [ Validators.minLength(3), Validators.maxLength(64)],],
    age: [ '', [ Validators.minLength(1), Validators.maxLength(3)],],
    email: [ '', [Validators.email, Validators.minLength(6), Validators.maxLength(64)],],
    password: ['', [Validators.minLength(6), Validators.maxLength(64)]],
    confirmPassword: ['', [Validators.minLength(6), Validators.maxLength(64) ]],
  });
  showPassword = false;

  

  //add firstname lastname gender
  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get gender(){
    return this.registerForm.get('gender');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get password() {
    return this.registerForm.get('password');
  }
  
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get confirmError(): string | boolean {
    //console.log(this.password?.value);
    if (this.confirmPassword?.errors?.['required']) 
      return 'Confirm your password';
    if(this.confirmPassword?.value != this.password?.value)
      return 'Passwords does not match'; 
    return false
  }

  get ageError(): string {
    if (this.age?.errors?.['required']) return 'Age is required';
    if (this.age?.errors?.['minlength'])
      return 'Age should be longer than 0 characters';
    if (this.age?.errors?.['maxlength'])
      return 'Age should be shorter than 4 characters';
    return 'Age is invalid';
  }

  get displayFirstNameError(): string {
    if (this.firstName?.errors?.['required']) return 'First Name is required';
    if (this.firstName?.errors?.['maxlength'])
      return 'First Name should be shorter than 64 characters';

    return 'Username is invalid';
  }
  get displayLastNameError(): string {
    if (this.lastName?.errors?.['required']) return 'Last Name is required';
    if (this.lastName?.errors?.['maxlength'])
      return 'Last Name should be shorter than 64 characters';

    return 'Username is invalid';
  }

  get emailError(): string {
    if (this.email?.errors?.['email']) return 'Email is invalid';
    if (this.email?.errors?.['required']) return 'Email is required';
    if (this.email?.errors?.['minlength'])
      return 'Email should be longer than 6 characters';
    if (this.email?.errors?.['maxlength'])
      return 'Email should be shorter than 64 characters';

    return 'Email is invalid';
  }
  

  get passwordError(): string {
    if (this.password?.errors?.['required']) return 'Password is required';
    if (this.password?.errors?.['minlength'])
      return 'Password should be longer than 6 characters';
    if (this.password?.errors?.['maxlength'])
      return 'Password should be shorter than 64 characters';
    return 'Password is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  register() {
    if (this.registerForm.valid) {
      this.store.dispatch(new Register())
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
