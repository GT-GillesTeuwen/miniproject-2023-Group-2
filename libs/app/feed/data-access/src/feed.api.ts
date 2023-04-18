import { Injectable } from '@angular/core';
import {collection, collectionData, doc, docData, Firestore} from '@angular/fire/firestore';
import {Functions,httpsCallable} from "@angular/fire/functions";
import {IProfile,IUpdateProfileResponse, IUpdateMatchRequest, IUpdateMatchResponse} from "@mp/api/profiles/util";
import {Observable} from "rxjs";
import { register } from 'swiper/element/bundle';


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
      this.functions,   // auth.functio,ns.ts in api/core/feature
      'updateMatch'
    )(request);
  }


}
