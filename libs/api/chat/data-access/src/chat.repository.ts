import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { IConversation } from '@mp/api/chat/util';
import * as admin from 'firebase-admin';

@Injectable()
export class ChatRepository {
  
  async findOne(conversation: IConversation) {
    if(conversation.ConversationID==null){
      throw new Error("Conversation ID is null in findOne() in chat.repository.ts");
    }
    return await admin
      .firestore()
      .collection('conversations')
      .withConverter<IConversation>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IConversation;
        },
        toFirestore: (it: IConversation) => it,
      })
      .doc(conversation.ConversationID)
      .get();
  }

  async createConversation(conversation: IConversation) {
    // Remove password field if present
    if(conversation.ConversationID==null){
      throw new Error("Conversation ID is null in createConversation() in chat.repository.ts");
    }
    return await admin
      .firestore()
      .collection('conversations')
      .doc(conversation.ConversationID)
      .create(conversation);
  }

  // async updateProfile(profile: IProfile) {
  //   if(profile.UID==null){
  //     throw new Error();
  //   }
  //   return await admin
  //     .firestore()
  //     .collection('profiles')
  //     .doc(profile.UID)
  //     .set(profile, { merge: true });
  // }
}
