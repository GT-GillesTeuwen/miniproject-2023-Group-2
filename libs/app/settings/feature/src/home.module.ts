import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/data-access';
import { SettingsPage } from './settings.page';
import { SettingsRouting } from './settings.routing';

@NgModule({
  imports: [CommonModule, IonicModule, ProfileModule, SettingsRouting],
  declarations: [SettingsPage],
})
export class SettingsModule {}
