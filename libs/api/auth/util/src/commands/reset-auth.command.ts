import { Console } from 'console';
import { IResetAuthRequest } from '../requests';


export class ResetAuthCommand {
  constructor(  public readonly request: IResetAuthRequest ) {console.log();
  } 
}
