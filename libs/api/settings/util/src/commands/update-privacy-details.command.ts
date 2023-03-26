import { IUpdatePrivacyDetailsRequest } from '../requests';

export class UpdatePrivacyDetailsCommand {
  constructor(public readonly request: IUpdatePrivacyDetailsRequest) {}
}
