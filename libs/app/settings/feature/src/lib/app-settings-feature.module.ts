import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { appSettingsFeatureRoutes } from './settings-page/lib.routes';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appSettingsFeatureRoutes), IonicModule,FormsModule],
  declarations: [SettingsPageComponent],
})
export class AppSettingsFeatureModule {}
