import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPassword } from '@mp/app/auth/util';
import { ActionsExecuting, actionsExecuting } from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
//import { Router } from '@angular/router'
import { Forgot } from '@mp/app/forgot/util';

@Component({
  selector: 'mp-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.scss'],
})
export class ForgotPageComponent {


  @Select(actionsExecuting([ForgotPassword])) busy$!: Observable<ActionsExecuting>;
  forgotForm = this.fb.group({
    email: [ '', [Validators.email, Validators.minLength(6), Validators.maxLength(64)],],
  });

  get email() {
    return this.forgotForm.get('email');
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
  ) {}

  sendEmail() {
    if (this.forgotForm.valid) {
      this.store.dispatch(new Forgot());
      //this.router.navigate(['/login']);

    }
  }
}
