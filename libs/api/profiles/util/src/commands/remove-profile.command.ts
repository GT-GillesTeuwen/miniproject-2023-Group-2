import { IRemoveProfileRequest } from '../requests';

export class RemoveProfileCommand {
  constructor(public readonly request: IRemoveProfileRequest) {}
}
