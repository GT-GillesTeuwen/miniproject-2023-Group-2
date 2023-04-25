
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import {IUpdateMatchRequest,IUpdateMatchResponse} from '@mp/api/feed/util'
import { FeedService } from '@mp/api/feed/feature';

export const updateMatch = functions.https.onCall(
  async (
    request: IUpdateMatchRequest
  ): Promise<IUpdateMatchResponse> => {
    console.log("This is functions of feed");
    const app = await NestFactory.createApplicationContext(CoreModule);
     const service = app.get(FeedService,{ strict: false });
     console.log(service);
     return service.updateMatch(request);
  }
);




