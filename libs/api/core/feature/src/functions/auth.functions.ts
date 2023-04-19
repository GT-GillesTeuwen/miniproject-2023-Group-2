import { AuthService } from '@mp/api/auth/feature';
import { NestFactory } from '@nestjs/core';
import { UserRecord } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import {IUpdateProfileRequest,IUpdateProfileResponse} from '@mp/api/profiles/util'

export const onAuthCreate = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(AuthService);
    service.onAuthCreate(user);
  });

  export const updateProfile = functions.https.onCall(
    async (
      request: IUpdateProfileRequest
    ): Promise<IUpdateProfileResponse> => {
      console.log(request);
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(AuthService);
      return service.updateProfile(request);
    }
  );
