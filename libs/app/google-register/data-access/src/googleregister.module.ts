import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GoogleRegisterState } from './register.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([GoogleRegisterState])],
})
export class GoogleRegisterModule {}
