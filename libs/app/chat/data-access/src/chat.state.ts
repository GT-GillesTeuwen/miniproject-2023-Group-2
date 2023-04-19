import { Injectable } from '@angular/core';

import { AuthState } from '@mp/app/auth/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {CreateConversation, SendMessage, SetConversation,SubscribeToConversation, UpdateMeetingDetails} from '@mp/app/chat/util'
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs';
import { ChatApi } from './chat.api';
import { AuthApi } from 'libs/app/auth/data-access/src/auth.api';
import { IConversation, ICreateConversationRequest, IMessage, IMessageSendRequest, IUpdateMeetingRequest } from '@mp/api/chat/util';
import { Navigate } from '@ngxs/router-plugin';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationStateModel {
  conversation: IConversation | null;
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
  static message(state: MessageStateModel) {
    return state.message;
  }

  @Action(SubscribeToConversation)
  subscribeToProfile(ctx: StateContext<ConversationStateModel>) {
    const matches = this.store.selectSnapshot(ProfileState.matches);
    if (!matches) return ctx.dispatch(new SetError('User not set'));

    return this.chatApi
      .conversation$(matches[0].ConversationID)
      .pipe(tap((conversation: IConversation) => ctx.dispatch(new SetConversation(conversation))));
  }

  @Action(SetConversation)
  setProfile(ctx: StateContext<ConversationStateModel>, { conversation }: SetConversation) {
    return ctx.setState(
      produce((draft) => {
        draft.conversation = conversation;
      })
    );
  }

  @Action(CreateConversation)
  async createConversation4(ctx: StateContext<ConversationStateModel>, { conversation }: CreateConversation) {
    alert("At State");
    try {
      const request: ICreateConversationRequest = {
             conversation: {
               ConversationID:conversation.ConversationID,
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
  async sendMessage(ctx: StateContext<ConversationStateModel>, { conversationID,message }: SendMessage) {
    
    try {
      const request: IMessageSendRequest = {
              conversation:conversationID,
              message: {
               ToUserID: message.ToUserID,
               FromUserID: message.FromUserID,
               DateSent:message.DateSent,
               Content:message.Content,
             },
           };
      const userCredential=await this.chatApi.sendMessage(request);
      //alert("id is "+userCredential?.user.uid);
      return userCredential;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(UpdateMeetingDetails)
  async updateMeetingDetails(ctx: StateContext<ConversationStateModel>, { conversationID,meeting }: UpdateMeetingDetails) {
    
    try {
      const request: IUpdateMeetingRequest = {
              conversation:conversationID,
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
