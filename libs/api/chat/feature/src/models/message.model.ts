
  import { ConversationCreatedEvent, IConversation, IMessage, MessageSentEvent } from "@mp/api/chat/util";
  
  import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from "firebase-admin/firestore";
  
  
  
  
  export class Message extends AggregateRoot implements IMessage {
    constructor(
      public ToUserID?: string | null | undefined,
      public FromUserID?: string | null | undefined,
      public DateSent?: Timestamp | null | undefined,
      public Content?: string | null | undefined
    ) {
      super();
    }
  
    static fromData(message: IMessage): Message {
      const instance = new Message(
        message.ToUserID,
        message.FromUserID,
        message.DateSent,
        message.Content
      );
      return instance;
    }
  
    send1(conversationID:string) {
      console.log("AHHHH in message model");
      this.apply(new MessageSentEvent(conversationID,this.toJSON()));
    }
  
  
    // updateAddressDetails(addressDetails: IAddressDetails) {
    //   if (!this.addressDetails) this.addressDetails = {};
    //   this.addressDetails.residentialArea = addressDetails.residentialArea
    //     ? addressDetails.residentialArea
    //     : this.addressDetails.residentialArea;
    //   this.addressDetails.workArea = addressDetails.workArea
    //     ? addressDetails.workArea
    //     : this.addressDetails.workArea;
    //   this.apply(new AddressDetailsUpdatedEvent(this.toJSON()));
    // }
  
    // updateDetails(conversation: IConversation) {
    //   this.ConversationID = conversation.ConversationID;
    //   this.User1ID = conversation.User1ID;
    //   this.User2ID = conversation.User2ID;
    //   this.Messages = conversation.Messages;
    //   //this.apply(new ProfileDetailsUpdatedEvent(this.toJSON()));
    // }
  
    
      
  
    toJSON(): IMessage {
      return {
        ToUserID: this.ToUserID,
        FromUserID: this.FromUserID,
        DateSent: this.DateSent,
        Content: this.Content,
      };
    }
  
   
  
    // updateOccupationDetails(occupationDetails: IOccupationDetails) {
    //   if (!this.occupationDetails) this.occupationDetails = {};
    //   this.occupationDetails.householdIncome = occupationDetails.householdIncome
    //     ? occupationDetails.householdIncome
    //     : this.occupationDetails.householdIncome;
    //   this.occupationDetails.occupation = occupationDetails.occupation
    //     ? occupationDetails.occupation
    //     : this.occupationDetails.occupation;
    //   this.apply(new OccupationDetailsUpdatedEvent(this.toJSON()));
    // }
  
    // updateAccountDetails(accountDetails: IAccountDetails) {
    //   if (!this.accountDetails) this.accountDetails = {};
    //   this.accountDetails.displayName = accountDetails.displayName
    //     ? accountDetails.displayName
    //     : this.accountDetails.displayName;
    //   this.accountDetails.email = accountDetails.email
    //     ? accountDetails.email
    //     : this.accountDetails.email;
    //   this.accountDetails.photoURL = accountDetails.photoURL
    //     ? accountDetails.photoURL
    //     : this.accountDetails.photoURL;
    //   this.accountDetails.password = accountDetails.password
    //     ? accountDetails.password
    //     : this.accountDetails.password;
    //   this.apply(new AccountDetailsUpdatedEvent(this.toJSON()));
  
  
    // private updateAccountDetailsStatus() {
    //   if (!this.accountDetails) {
    //     this.accountDetails = {};
    //     this.accountDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   if (!this.accountDetails.displayName || !this.accountDetails.email) {
    //     this.accountDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   this.accountDetails.status = ProfileStatus.COMPLETE;
    //   return;
    // }
  
    // private updateAddressDetailsStatus() {
    //   if (!this.addressDetails) {
    //     this.addressDetails = {};
    //     this.addressDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   if (!this.addressDetails.residentialArea || !this.addressDetails.workArea) {
    //     this.addressDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   this.addressDetails.status = ProfileStatus.COMPLETE;
    //   return;
    // }
  
    // private updateContactDetailsStatus() {
    //   if (!this.ContactDetails) {
    //     this.ContactDetails = {};
    //     this.ContactDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   if (!this.ContactDetails.cellphone) {
    //     this.ContactDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   this.ContactDetails.status = ProfileStatus.COMPLETE;
    //   return;
    // }
  
    // private updatePersonalDetailsStatus() {
    //   if (!this.personalDetails) {
    //     this.personalDetails = {};
    //     this.personalDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   if (
    //     !this.personalDetails.age ||
    //     !this.personalDetails.gender ||
    //     !this.personalDetails.ethnicity
    //   ) {
    //     this.personalDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   this.personalDetails.status = ProfileStatus.COMPLETE;
    //   return;
    // }
  
    // private updateOccupationDetailsStatus() {
    //   if (!this.occupationDetails) {
    //     this.occupationDetails = {};
    //     this.occupationDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   if (
    //     !this.occupationDetails.householdIncome ||
    //     !this.occupationDetails.occupation
    //   ) {
    //     this.occupationDetails.status = ProfileStatus.INCOMPLETE;
    //     this.status = ProfileStatus.INCOMPLETE;
    //     return;
    //   }
  
    //   this.occupationDetails.status = ProfileStatus.COMPLETE;
    //   return;
    // }
  
    // updateStatus() {
    //   this.updateAccountDetailsStatus();
    //   this.updateAddressDetailsStatus();
    //   this.updateContactDetailsStatus();
    //   this.updatePersonalDetailsStatus();
    //   this.updateOccupationDetailsStatus();
  
    //   if (
    //     this.accountDetails?.status === ProfileStatus.COMPLETE &&
    //     this.addressDetails?.status === ProfileStatus.COMPLETE &&
    //     this.ContactDetails?.status === ProfileStatus.COMPLETE &&
    //     this.personalDetails?.status === ProfileStatus.COMPLETE &&
    //     this.occupationDetails?.status === ProfileStatus.COMPLETE
    //   ) {
    //     this.status = ProfileStatus.COMPLETE;
    //   }
  
    //   this.apply(new ProfileStatusUpdatedEvent(this.toJSON()));
    // }
  
  }
  
  