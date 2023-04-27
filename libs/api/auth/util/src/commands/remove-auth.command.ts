import { IRemoveAuthRequest } from '../requests';

export class RemoveAuthCommand {
  constructor(public readonly request: IRemoveAuthRequest) {}
}
