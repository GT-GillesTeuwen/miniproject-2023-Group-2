import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { UpdatePersonalDetails } from '@mp/app/profile/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-personal-details-component',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(actionsExecuting([UpdatePersonalDetails]))
  busy$!: Observable<ActionsExecuting>;
  personalDetailsForm = this.fb.group({
    Hobby: ['', [Validators.minLength(4), Validators.maxLength(64)]],
    Cell: ['', [Validators.minLength(10), Validators.maxLength(64)]],
    Major: ['', [Validators.minLength(4), Validators.maxLength(64)]],
  });
  showPassword = false;

  get hobby() {
    return this.personalDetailsForm.get('age');
  }

  get major() {
    return this.personalDetailsForm.get('gender');
  }

  get cell() {
    return this.personalDetailsForm.get('Cell');
  }


  get majorError(): string {
    if (this.major?.errors?.['required']) return 'Age is required';
    if (this.major?.errors?.['minlength'])
      return 'Age should be longer than 4 characters';
    if (this.major?.errors?.['maxlength'])
      return 'Age should be shorter than 64 characters';

    return 'Age is invalid';
  }

  get hobbyError(): string {
    if (this.hobby?.errors?.['required']) return 'Age is required';
    if (this.hobby?.errors?.['minlength'])
      return 'Age should be longer than 4 characters';
    if (this.hobby?.errors?.['maxlength'])
      return 'Age should be shorter than 64 characters';

    return 'Age is invalid';
  }

  get cellError(): string {
    if (this.cell?.errors?.['required']) return 'Age is required';
    if (this.cell?.errors?.['minlength'])
      return 'Age should be longer than 4 characters';
    if (this.cell?.errors?.['maxlength'])
      return 'Age should be shorter than 64 characters';

    return 'Age is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  updatePersonalDetails() {
    this.store.dispatch(new UpdatePersonalDetails());
  }
}
