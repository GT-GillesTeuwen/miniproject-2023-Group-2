import { AuthModule } from '@mp/api/auth/feature';
import { ChatModule } from '@mp/api/chat/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { FeedModule } from '@mp/api/feed/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, EventstoreModule, ProfilesModule, UsersModule,ChatModule,FeedModule],
})
export class CoreModule {}
