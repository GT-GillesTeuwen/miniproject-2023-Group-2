import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@mp/app/dashboard/feature').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@mp/app/profile/feature').then((m) => m.ProfileModule),
      },
      {
        path: 'test',
        loadChildren: () =>
          import('@mp/app/tos/feature').then((m) => m.TosModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/dashboard',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
