
import { FeedModule as feedDataAccessModule } from '@mp/api/feed/data-access'
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedSagas } from './feed.sagas';
import { FeedService } from './feed.service';
import { UpdateMatchHandler } from './commands';
export const CommandHandlers = [
  UpdateMatchHandler,
];
// export const EventHandlers = [
//   ProfileMatchesUpdatedEventhandler,
// ];

@Module({
  imports: [CqrsModule, feedDataAccessModule],
  providers: [
    FeedService,
    ...CommandHandlers,
    // ...EventHandlers,
    FeedSagas,
  ],
  exports: [FeedService],
})
export class FeedModule {}
