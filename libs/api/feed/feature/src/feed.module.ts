
import { feedModule as feedDataAccessModule } from '@mp/api/feed/data-access'
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleExampleExampleHandler } from './commands';
import { ExampleExampleExampleHandler } from './events';
import { feedSagas } from './feed.sagas';
import { feedService } from './feed.service';
export const CommandHandlers = [
  ExampleExampleExampleHandler,
];
export const EventHandlers = [
  ExampleExampleExampleHandler,
];

@Module({
  imports: [CqrsModule, feedDataAccessModule],
  providers: [
    feedService,
    ...CommandHandlers,
    ...EventHandlers,
    feedSagas,
  ],
  exports: [feedService],
})
export class feedModule {}
