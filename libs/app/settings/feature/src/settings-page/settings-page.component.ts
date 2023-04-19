
import { Component, NgModule } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'mp-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {

  constructor(
    private readonly store: Store
  ) {}

  selectedValue: string | undefined;
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
    this.selectedValue = event.detail.value;
    this.privacytype = this.selectedValue;
  //  console.log(this.privacytype);
    alert(this.privacytype);
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
    const blockedSave = [];

    // send object of saved variables
  }


  

}
