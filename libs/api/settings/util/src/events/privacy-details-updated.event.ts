import { ISettings } from '../interfaces';

export class PrivacyDetailsUpdatedEvent {
  constructor(public readonly profile: ISettings) {}
}
