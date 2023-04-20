import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from './settings.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SettingsState])],
})
export class SettingsModule {}
