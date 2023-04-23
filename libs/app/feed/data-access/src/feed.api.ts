import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Functions,httpsCallable} from "@angular/fire/functions";
import {IProfile, IUpdateTimeRequest, IUpdateTimeResponse} from "@mp/api/profiles/util";
import {Observable} from "rxjs";
import { register } from 'swiper/element/bundle';
import {IUpdateMatchRequest, IUpdateMatchResponse} from '@mp/api/feed/util'
import { ICreateConversationRequest,ICreateConversationResponse } from '@mp/api/chat/util';
import { IMatchDetails } from '@mp/api/profiles/util';


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

  async Handle(UID : string,MID : string,type :string){
    let response;

    console.log("UID : "+ UID + "\n" + "MID : " + MID + "\n" + "type : " + type);
    if(type=="SEND"){

      //Current user

      let matches : IMatchDetails ={
        MatchUserID:MID,
        PairID: null,
        MatchStatus : "SENT"
      };

      let request: IUpdateMatchRequest = {
        profile: {
          UID:UID,
          Matches: [matches],
        },
        type : "SEND"
      };

       response = await this.updateMatches(request);

      if(response==null){
        throw "UpdateMatch failed User";
      }

      
      //Matched user
       matches  = {
        MatchUserID:UID,
        PairID: null,
        MatchStatus : "RECEIVED"
      };

      request = {
        profile: {
          UID:MID,
          Matches: [matches],
        },
        type : "SEND"
      }

       response = await this.updateMatches(request);
       if(response==null){
        throw "UpdateMatch failed Target";
      }

    }
    else
    if(type == "PAIR"){
      //Current user

      let matches : IMatchDetails ={
        MatchUserID:MID,
        PairID: UID+MID,
        MatchStatus : "PAIRED"
      };

      let request: IUpdateMatchRequest = {
        profile: {
          UID:UID,
          Matches: [matches],
        },
        type : "PAIR"
      };

       response = await this.updateMatches(request);

      if(response==null){
        throw "Pair failed User";
      }

      
      //Matched user
       matches  = {
        MatchUserID:UID,
        PairID: UID+MID,
        MatchStatus : "PAIRED"
      };

      request = {
        profile: {
          UID:MID,
          Matches: [matches],
        },
        type : "PAIR"
      }

       response = await this.updateMatches(request);
       if(response==null){
        throw "Pair failed Target";
      }

      const finalrequest: ICreateConversationRequest = {
        conversation: {
          ConversationID:UID+MID,
          User1ID:UID,
           User2ID:MID,
           Messages: [],
           MeetingDetails: null,
        },
      };

      response = await this.createCollection(finalrequest);
    }
    else
    if(type == "REMOVE"){
      //Current user

      let matches : IMatchDetails ={
        MatchUserID:MID,
        PairID: null,
        MatchStatus : null
      };

      let request: IUpdateMatchRequest = {
        profile: {
          UID:UID,
          Matches: [matches],
        },
        type : "REMOVE"
      };

       response = await this.updateMatches(request);

      if(response==null){
        throw "Remove failed User";
      }

      
      //Matched user
       matches  = {
        MatchUserID:UID,
        PairID: null,
        MatchStatus : null
      };

      request = {
        profile: {
          UID:MID,
          Matches: [matches],
        },
        type : "REMOVE"
      }

       response = await this.updateMatches(request);
       if(response==null){
        throw "Remove failed Target";
      }
    }


    return response;
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

  async createCollection(request: ICreateConversationRequest) {
    return await httpsCallable<
    ICreateConversationRequest,
    ICreateConversationResponse
    >(
      this.functions,   // chat.functions.ts in api/core/feature
      'createConversation'
    )(request);
  }



  async updateTime(request: IUpdateTimeRequest) {
    return await httpsCallable<
      IUpdateTimeRequest,
      IUpdateTimeResponse
    >(
      this.functions,   // ?
      'updateTime'
    )(request);
  }

}
