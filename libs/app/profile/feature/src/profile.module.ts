import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileModule as ProfileDataAccessModule } from '@mp/app/profile/data-access';
import { ProfileModule as ProfileUiModule } from '@mp/app/profile/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { AppFeedFeatureModule } from '@mp/app/feed/feature';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReceivedBubbleUiComponent } from 'libs/app/chat/feature/src/lib/received-bubble-ui/received-bubble-ui.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileRouting,
    ProfileUiModule,
    ProfileDataAccessModule,
    NgxSkeletonLoaderModule,
    AppFeedFeatureModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ProfilePage, ReceivedBubbleUiComponent],
})
export class ProfileModule {}
