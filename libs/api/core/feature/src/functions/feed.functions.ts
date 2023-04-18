import { AuthService } from '@mp/api/auth/feature';
import { NestFactory } from '@nestjs/core';
import { UserRecord } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import {IUpdateMatchRequest,IUpdateMatchResponse} from '@mp/api/profiles/util'

// export const updateAddressDetails = functions.https.onCall(
//   async (
//     request: IUpdateMatchRequest
//   ): Promise<IUpdateMatchResponse> => {
//     const app = await NestFactory.createApplicationContext(CoreModule);
//      const service = app.get(ProfilesService);
//      return service.updateAddressDetails(request);
//   }
// );




