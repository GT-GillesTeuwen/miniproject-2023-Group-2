import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightModule } from '@mp/app/copyright/ui';
import { GoogleRegisterModule as GoogleRegisterDataAccessModule } from '@mp/app/google-register/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { GoogleRegisterPage } from './googleregister.page';
import { GoogleRegisterRouting } from './googleregister.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    GoogleRegisterDataAccessModule,
    NgxsFormPluginModule,
    GoogleRegisterRouting,
    CopyrightModule,
  ],
  declarations: [GoogleRegisterPage],
  exports: [],
})
export class GoogleRegisterModule {}
