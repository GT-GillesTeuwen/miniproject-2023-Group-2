
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ExampleExampleExampleEvent } from '@mp/api/settings/util';

@EventsHandler(ExampleExampleExampleEvent)
class ExampleExampleExampleHandler implements IEventHandler<ExampleExampleExampleEvent> {
  constructor() {}

  async handle(event: ExampleExampleExampleEvent): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
