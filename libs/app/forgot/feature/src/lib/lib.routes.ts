import { Route } from '@angular/router';
import { ForgotPageComponent } from './forgot-page/forgot-page.component'

export const appForgotFeatureRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: ForgotPageComponent,
  }
];
