import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { IConversation, IMeetingDetails, IMessage } from '@mp/api/chat/util';
import * as admin from 'firebase-admin';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


@Injectable()
export class ChatRepository {

  async findOne(conversation: IConversation) {
    if (conversation.PairID == null) {
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
      .doc(conversation.PairID)
      .get();
  }

  async findOneByID(pairID: string) {
    if (pairID == null) {
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
      .doc(pairID)
      .get();
  }

  async createConversation1(conversation: IConversation) {
    // Remove password field if present
    if (conversation.PairID == null) {
      throw new Error("Conversation ID is null in createConversation1() in chat.repository.ts");
    }
    console.log("here5");
    return await admin
      .firestore()
      .collection('conversations')
      .doc(conversation.PairID)
      .create(conversation);
  }

  async sendMessage(message: IMessage, pairID: string) {
    // Remove password field if present
    if (pairID == null) {
      throw new Error("Conversation ID is null in sendMessage() in chat.repository.ts");
    }
    const convoData = (await this.findOneByID(pairID)).data() as IConversation;



    convoData?.Messages?.push(message);
    return await admin
      .firestore()
      .collection('conversations')
      .doc(pairID)
      .set(convoData, { merge: true });
    
    
  }

  async updateMeeting(meeting: IMeetingDetails, pairID: string) {
    // Remove password field if present
    if (pairID == null) {
      throw new Error("Conversation ID is null in sendMessage() in chat.repository.ts");
    }
    
    if(meeting.Date!=undefined && meeting.Date!=null){
      return await admin
      .firestore()
      .collection('conversations')
      .doc(pairID)
      .update({
        "MeetingDetails": meeting
      });
    }else{
      return await admin
      .firestore()
      .collection('conversations')
      .doc(pairID)
      .update({
        "MeetingDetails.TimeInvested": meeting.TimeInvested
      });
    }

    
    
    
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
