import { Injectable } from '@angular/core';

import { AuthState } from '@mp/app/auth/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {CreateConversation, SendMessage, SetAllConversations, SetConversation,SubscribeToConversation, SubscribeToConversations, UpdateMeetingDetails} from '@mp/app/chat/util'
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { from, tap } from 'rxjs';
import { ChatApi } from './chat.api';
import { AuthApi } from '@mp/app/auth/data-access';
import { IConversation, ICreateConversationRequest, IMessage, IMessageSendRequest, IUpdateMeetingRequest } from '@mp/api/chat/util';
import { Navigate } from '@ngxs/router-plugin';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationStateModel {
  conversation: IConversation | null;
  conversations: IConversation[] | null;
}

export interface MessageStateModel {
  message: IMessage | null;
}


@State<MessageStateModel>({
  name: 'message',
  defaults: {
    message: null,
    
  },
})

@State<ConversationStateModel>({
  name: 'conversation',
  defaults: {
    conversation: null,
    conversations : null,
  },
})

@Injectable()
export class ChatState {
  constructor(
    private readonly chatApi: ChatApi,
    private readonly authApi: AuthApi,
    private readonly store: Store
  ) {}

  @Selector()
  static conversation(state: ConversationStateModel) {
    return state.conversation;
  }

  @Selector()
  static meetingDate(state: ConversationStateModel) {
    return state.conversation?.MeetingDetails?.Date;
  }

  @Selector()
  static meetingTime(state: ConversationStateModel) {
    return state.conversation?.MeetingDetails?.Time;
  }

  @Selector()
  static meetingLocation(state: ConversationStateModel) {
    return state.conversation?.MeetingDetails?.Location;
  }

  @Selector()
  static timeInvested(state: ConversationStateModel) {
    return state.conversation?.MeetingDetails?.TimeInvested;
  }
  @Selector()
  static allConversations(state: ConversationStateModel) {
    return state.conversations;
  }

  @Selector()
  static message(state: MessageStateModel) {
    return state.message;
  }

  @Action(SubscribeToConversation)
  subscribeToConversation(ctx: StateContext<ConversationStateModel>,{pairID}:SubscribeToConversation) {
    const matches = this.store.selectSnapshot(ProfileState.matches);
    if (!matches) return ctx.dispatch(new SetError('matches not set'));

    return this.chatApi
      .conversation$(pairID)

      .pipe(tap((conversation: IConversation) => ctx.dispatch(new SetConversation(conversation))));
  }

  @Action(SetConversation)
  setConservation(ctx: StateContext<ConversationStateModel>, { conversation }: SetConversation) {
    return ctx.setState(
      produce((draft) => {
        draft.conversation = conversation;
      })
    );
  }

  @Action(SubscribeToConversations)
  subscribeToConversations(ctx: StateContext<ConversationStateModel>) {
    // const user = this.store.selectSnapshot(AuthState.user);
    // console.log("BAHHHHH");
    // console.log(user);
    // if (!user) return ctx.dispatch(new SetError('User not set'));
    
    const thing= from( this.chatApi
      .allConvos$())
      .pipe(tap((conversations: IConversation[]) => ctx.dispatch(new SetAllConversations(conversations))));
      
    console.log("here is thing",thing);
      return thing;
  }

  @Action(CreateConversation)
  async createConversation4(ctx: StateContext<ConversationStateModel>, { conversation }: CreateConversation) {
    try {
      const request: ICreateConversationRequest = {
             conversation: {
               PairID:conversation.PairID,
               User1ID:conversation.User1ID,
                User2ID:conversation.User2ID,
                Messages:conversation.Messages,
                MeetingDetails:conversation.MeetingDetails,
             },
           };
      const userCredential=await this.chatApi.createConversation3(request);
      //alert("id is "+userCredential?.user.uid);
      return userCredential;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SendMessage)
  async sendMessage(ctx: StateContext<ConversationStateModel>, { pairID,message,newMeetingTime }: SendMessage) {
    
    try {
      const request: IMessageSendRequest = {
              pairID:pairID,
              message: {
               ToUserID: message.ToUserID,
               FromUserID: message.FromUserID,
               DateSent:message.DateSent,
               Content:message.Content,
             },
             newMeetingTime:newMeetingTime,
           };
      const userCredential=await this.chatApi.sendMessage(request);
      //alert("id is "+userCredential?.user.uid);
      return userCredential;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SetAllConversations)
  setAllConversations(ctx: StateContext<ConversationStateModel>, { conversations }: SetAllConversations) {
    return ctx.setState(
      produce((draft) => {
        draft.conversations = conversations;
      })
    );
  }

  @Action(UpdateMeetingDetails)
  async updateMeetingDetails(ctx: StateContext<ConversationStateModel>, { pairID,meeting }: UpdateMeetingDetails) {
    
    try {
      const request: IUpdateMeetingRequest = {
              pairID:pairID,
              meeting: {
               Date: meeting.Date,
               Time: meeting.Time,
               Location:meeting.Location,
               FoodPreference:meeting.FoodPreference,
               DressCode:meeting.DressCode,
               TimeInvested:meeting.TimeInvested
             },
           };
      const userCredential=await this.chatApi.updateMeeting(request);
      //alert("id is "+userCredential?.user.uid);
      return userCredential;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }



}
