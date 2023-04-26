import { AuthModule as AuthDataAccessModule } from '@mp/api/auth/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSagas } from './auth.sagas';
import { AuthService } from './auth.service';
import { CreateAuthHandler, RemoveAuthHandler, UpdateAuthHandler } from './commands';
import { AuthCreatedHandler, AuthRemovedhandler, AuthUpdatedHandler } from './events';
export const CommandHandlers = [CreateAuthHandler, UpdateAuthHandler, RemoveAuthHandler];
export const EventHandlers = [AuthCreatedHandler, AuthUpdatedHandler, AuthRemovedhandler];

@Module({
  imports: [CqrsModule, AuthDataAccessModule],
  providers: [AuthService, ...CommandHandlers, ...EventHandlers, AuthSagas],
  exports: [AuthService],
})
export class AuthModule {}
