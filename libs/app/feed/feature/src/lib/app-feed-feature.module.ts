import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { appFeedFeatureRoutes } from './lib.routes';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { CardStackContainerComponent } from './card-stack-container/card-stack-container.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CardItemComponent } from './card-item/card-item.component';
import {AppFeedDataAccessModule} from "@mp/app/feed/data-access";

register();
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appFeedFeatureRoutes),
    IonicModule,
    AppFeedDataAccessModule
  ],
  declarations: [
    FeedPageComponent,
    CardStackContainerComponent,
    CardItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: Window, useValue: window}
  ]
})
export class AppFeedFeatureModule {}
