import { Route } from '@angular/router';
import { TosPage } from '@mp/app/tos/feature';
import { SettingsPageComponent } from './settings-page.component';

export const appSettingsFeatureRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  { 
    path: '',
    pathMatch: 'full',
    component: SettingsPageComponent
  },
  {
    path: 'tos',
    pathMatch: 'full',
    component: TosPage
  }
];
