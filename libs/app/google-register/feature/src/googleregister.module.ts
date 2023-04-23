import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightModule } from '@mp/app/copyright/ui';
import { RegisterModule as RegisterDataAccessModule } from '@mp/app/register/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { GoogleRegisterPage } from './googleregister.page';
import { RegisterRouting } from './googleregister.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterDataAccessModule,
    NgxsFormPluginModule,
    RegisterRouting,
    CopyrightModule,
  ],
  declarations: [GoogleRegisterPage],
  exports: [],
})
export class GoogleRegisterModule {}
