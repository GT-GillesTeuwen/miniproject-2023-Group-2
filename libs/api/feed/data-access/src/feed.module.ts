import { Module } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { ProfilesRepository } from '@mp/api/profiles/data-access';

@Module({
  providers: [FeedRepository,ProfilesRepository],
  exports: [FeedRepository,ProfilesRepository],
})
export class FeedModule {}
