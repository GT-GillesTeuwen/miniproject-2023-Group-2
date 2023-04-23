import { Component } from '@angular/core';
import { ContinueWithGoogle } from '@mp/app/welcome/util';
import {
  ActionsExecuting,
  actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-welcome-page',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  @Select(actionsExecuting([ContinueWithGoogle])) 
  busy$!: Observable<ActionsExecuting>;

  constructor(private readonly store: Store) {}

  continueWithGoogle() {
    this.store.dispatch(new ContinueWithGoogle());
  }
}
