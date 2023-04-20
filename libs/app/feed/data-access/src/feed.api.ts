import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Functions,httpsCallable} from "@angular/fire/functions";
import {IProfile, IUpdateTimeRequest, IUpdateTimeResponse} from "@mp/api/profiles/util";
import {Observable} from "rxjs";
import { register } from 'swiper/element/bundle';
import {IUpdateMatchRequest, IUpdateMatchResponse} from '@mp/api/feed/util'


register();
@Injectable()
export class FeedApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  getProfileSuggestions(){
    const profileCollectionReference = collection(this.firestore, 'Profiles/');
    return collectionData(profileCollectionReference) as Observable<IProfile[]>;
  }



  async updateMatches(request: IUpdateMatchRequest) {
    return await httpsCallable<
      IUpdateMatchRequest,
      IUpdateMatchResponse
    >(
      this.functions,   // feed.functions.ts in api/core/feature
      'updateMatch'
    )(request);
  }
  async updateTime(request: IUpdateTimeRequest) {
    return await httpsCallable<
      IUpdateTimeRequest,
      IUpdateTimeResponse
    >(
      this.functions,   // auth.functio,ns.ts in api/core/feature
      'updateTime'
    )(request);
  }

}
