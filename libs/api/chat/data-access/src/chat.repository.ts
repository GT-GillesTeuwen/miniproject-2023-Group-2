import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { IConversation, IMeetingDetails, IMessage } from '@mp/api/chat/util';
import * as admin from 'firebase-admin';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


@Injectable()
export class ChatRepository {

  async findOne(conversation: IConversation) {
    if (conversation.ConversationID == null) {
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

  async findOneByID(conversationID: string) {
    if (conversationID == null) {
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
      .doc(conversationID)
      .get();
  }

  async createConversation1(conversation: IConversation) {
    // Remove password field if present
    if (conversation.ConversationID == null) {
      throw new Error("Conversation ID is null in createConversation1() in chat.repository.ts");
    }
    console.log("here5");
    return await admin
      .firestore()
      .collection('conversations')
      .doc(conversation.ConversationID)
      .create(conversation);
  }

  async sendMessage(message: IMessage, conversationID: string) {
    // Remove password field if present
    if (conversationID == null) {
      throw new Error("Conversation ID is null in sendMessage() in chat.repository.ts");
    }
    const convoData = (await this.findOneByID(conversationID)).data() as IConversation;



    convoData?.Messages?.push(message);
    return await admin
      .firestore()
      .collection('conversations')
      .doc(conversationID)
      .set(convoData, { merge: true });
    
    
  }

  async updateMeeting(meeting: IMeetingDetails, conversationID: string) {
    // Remove password field if present
    if (conversationID == null) {
      throw new Error("Conversation ID is null in sendMessage() in chat.repository.ts");
    }
    
    return await admin
      .firestore()
      .collection('conversations')
      .doc(conversationID)
      .update({
        "MeetingDetails": meeting
      });
    
    
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
