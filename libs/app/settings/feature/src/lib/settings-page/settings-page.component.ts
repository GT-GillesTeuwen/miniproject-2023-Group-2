
import { Component, NgModule } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import {UpdateSettings} from '@mp/app/profile/util'
import { ISettings } from '@mp/api/profiles/util';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Observable } from 'rxjs';


@Component({
  selector: 'mp-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  constructor(
    private readonly store: Store
  ) {
    
    this.store.select(ProfileState.settings).subscribe((settings) => {
      this.rangeValue={lower:16,upper:50};
      if(settings!=undefined){
        this.rangeValue={lower:settings?.AgeRange?.MinAge!,upper:settings?.AgeRange?.MaxAge!}
        if(settings.Privacy==null||settings.Privacy==""){
          this.selectedValue="Public";
        }else{
          this.selectedValue=settings.Privacy!;
        }
       
      }else{
      }
      
    });
  }

  selectedValue="Private";
  privacytype : string | undefined;

  rangeValue = { 
    lower: 16,
    upper: 50
  }


  
  lowerValue = this.rangeValue.lower;
  upperValue = this.rangeValue.upper;
  initialVisibility = 'private';
  showSaveButton = false;
  lowerValueLabel: any;

  onRadioGroupChange(event: CustomEvent<IonRadioGroup>) {
    // this.selectedValue = event.detail.value;
    // this.privacytype = this.selectedValue;
  //  console.log(this.privacytype);
    
  }

  onRangeChange(event: any) {
    this.lowerValue = event.detail.value.lower;
    this.upperValue = event.detail.value.upper;
}

  pinFormatter(value: number) {
    return `${value}`;
  }

  ngOnInit()
  {
    this.initialVisibility = 'private'; 
   // this.visibility = this.initialVisibility;
  }
  onVisibilityChange() {
    this.showSaveButton = true;
  }

  getSettings()
  {
    // getPrivacy : string;
    // getAge = {getLower : 0 , getUpper : 100 }
    // getBlocked : [];

    // retreive information to load Settings page
  }

  SaveChanges()
  {
    const privacySave = this.privacytype;
    const ageSave = {lowerSave : this.lowerValue, upperSave : this.upperValue}
    const blockedSave:string[] = [];

    const settings:ISettings={
      Privacy:this.selectedValue,
      AgeRange:{
        MinAge:this.lowerValue,
        MaxAge:this.upperValue,
      },
      BlockedList:blockedSave
    }
    // send object of saved variables
    this.store.dispatch(new UpdateSettings(settings))
  }


  

}
