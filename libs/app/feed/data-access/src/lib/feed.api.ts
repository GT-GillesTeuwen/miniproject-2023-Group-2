import { Injectable } from '@angular/core';
import {collection, collectionData, doc, docData, Firestore} from '@angular/fire/firestore';
import {Functions} from "@angular/fire/functions";
import {IProfile} from "@mp/api/profiles/util";
import {Observable} from "rxjs";


@Injectable()
export class FeedApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  getProfileSuggestions(){
    const profileCollectionReference = collection(this.firestore, 'profiles');
    return collectionData(profileCollectionReference) as Observable<IProfile[]>;
  }
}
