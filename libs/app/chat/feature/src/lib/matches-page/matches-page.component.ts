import { Component } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mp-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.scss'],
})
export class MatchesPageComponent {

  @Select(ProfileState.allProfiles) matches$!: Observable<IProfile[] | null>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
}
