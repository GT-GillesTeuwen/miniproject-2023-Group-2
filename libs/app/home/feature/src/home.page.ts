import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile, SubscribeToMatches } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  public isSearchBarOpened = false;
  constructor(private readonly store: Store, private navCtrl: NavController) {}

  waitASecond(){
    this.store.select(ProfileState.profile).subscribe((profile) => {
      if(profile!=undefined){
        if(profile.TimeRemaining != null && profile.TimeRemaining!= undefined)
        if(profile.TimeRemaining <= 0){
          

          this.navCtrl.navigateForward('home/chat/verify');
        }
      }else{
        alert("Array undefined subscribing again");
      }
    });
  }

  ionViewWillEnter() {
    this.store.dispatch(new SubscribeToProfile());
    this.store.dispatch(new SubscribeToMatches());

    setTimeout(() => this.waitASecond(), 1000);
  }
}
