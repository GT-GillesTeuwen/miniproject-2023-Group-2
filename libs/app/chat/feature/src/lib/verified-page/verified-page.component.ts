import { Component } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'mp-verified-page',
  templateUrl: './verified-page.component.html',
  styleUrls: ['./verified-page.component.scss'],
})
export class VerifiedPageComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  public isSearchBarOpened = false;
  constructor(private readonly store: Store, private navCtrl: NavController) {}

  goHome(){
    this.navCtrl.navigateForward('home/feed');
  }
}
