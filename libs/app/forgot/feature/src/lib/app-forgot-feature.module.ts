import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
// import { CopyrightModule } from '@mp/app/copyright/ui';
// import { LoginModule as LoginDataAccessModule } from '@mp/app/login/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { appForgotFeatureRoutes } from './lib.routes';
import { ForgotPageComponent } from './forgot-page/forgot-page.component';
import { ForgotModule } from '@mp/app/forgot/data-access'

@NgModule({
  imports: [
    RouterModule.forChild(appForgotFeatureRoutes),
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    // LoginDataAccessModule,
    NgxsFormPluginModule,
    // CopyrightModule,
    ForgotModule
  ],
  declarations: [ForgotPageComponent],
})
export class AppForgotFeatureModule {}
