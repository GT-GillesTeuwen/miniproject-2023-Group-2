import { IUpdateProfileRequest } from '../requests';

export class UpdateDetailsCommand {
  constructor(public readonly request: IUpdateProfileRequest) {}
}
