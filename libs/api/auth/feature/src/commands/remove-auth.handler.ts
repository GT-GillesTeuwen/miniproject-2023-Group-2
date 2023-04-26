import { CreateAuthCommand, IAuth, IRemoveAuthRequest, RemoveAuthCommand } from '@mp/api/auth/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Auth } from '../models';

@CommandHandler(RemoveAuthCommand)
export class RemoveAuthHandler implements ICommandHandler<RemoveAuthCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: RemoveAuthCommand) {
    console.log(`${RemoveAuthHandler.name}`);

    const request = command.request;
    const data: IAuth = {
      id: request.auth.id
    };
    const auth = this.publisher.mergeObjectContext(Auth.fromData(data));

    const req : IRemoveAuthRequest = {
        auth : request.auth
    };
    auth.remove(req);
    auth.commit();
  }
}
