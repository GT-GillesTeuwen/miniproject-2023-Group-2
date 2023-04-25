import { NotImplementedException } from '@nestjs/common';
import { ResetAuthCommand } from '../util/src/commands/reset-auth.command';
import { ResetAuthHandler } from './src/commands/reset-auth.handler';

describe('AuthFeature', () => {
  let resetAuthHandler: ResetAuthHandler;
  let resetAuthCommand : ResetAuthCommand

  beforeEach(() => {
    resetAuthHandler = new ResetAuthHandler();
    resetAuthCommand = new ResetAuthCommand();
  });

  describe('AuthFeature', () => {
    it('should work', async () => {
      expect(await resetAuthHandler.execute(resetAuthCommand)).toEqual(NotImplementedException);
    });
  });
});
  

