import { IAuth } from '../interfaces';

export class AuthRemovedEvent {
  constructor(public readonly auth: IAuth) {}
}
