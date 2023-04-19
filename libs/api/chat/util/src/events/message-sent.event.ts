import { IMessage } from '../interfaces';

export class ContactDetailsUpdatedEvent {
  constructor(public readonly message: IMessage) {}
}
