import {
    ContactDetailsUpdatedEvent,
    IContactDetails,
    IPersonalDetails,
    IProfile,
    PersonalDetailsUpdatedEvent,
    ProfileCreatedEvent,
    AgeGroup,Gender
} from '@mp/api/profiles/util';
import { AggregateRoot } from '@nestjs/cqrs';




export class Profile extends AggregateRoot implements IProfile {
  constructor(

    public UID: string,
    public TimeRemaining?: number | null | undefined,
    public RecentlyActive?: boolean | null | undefined,
    public Gender?: Gender | null | undefined,
    public Age?: string | null | undefined,
    public Hobby?: string[] | null | undefined,
    public Major?: string | null | undefined,
    public Name?: IPersonalDetails | null | undefined,
    public ContactDetails?: IContactDetails | null | undefined,
    public Created?: FirebaseFirestore.Timestamp | null | undefined
  ) {
    super();
  }

  static fromData(profile: IProfile): Profile {
    const instance = new Profile(
      profile.UID,
      profile.TimeRemaining,
      profile.RecentlyActive,
      profile.Gender,
      profile.Age,
      profile.Hobby,
      profile.Major,
      profile.Name,
      profile.ContactDetails,
      profile.Created
    );
    return instance;
  }

  create() {
    this.apply(new ProfileCreatedEvent(this.toJSON()));
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

  updateContactDetails(ContactDetails: IContactDetails) {
    if (!this.ContactDetails) this.ContactDetails = {};
    if(this.ContactDetails){
      this.ContactDetails.Cell = ContactDetails.Cell
      ? ContactDetails.Cell
      : this.ContactDetails.Cell;
    this.ContactDetails.Email = ContactDetails.Email
    ? ContactDetails.Email
    : this.ContactDetails.Cell;
    this.apply(new ContactDetailsUpdatedEvent(this.toJSON()));
    }

  }

  toJSON(): IProfile {
    return {
      UID: this.UID,
      TimeRemaining: this.TimeRemaining,
      RecentlyActive: this.RecentlyActive,
      Gender: this.Gender,
      Age: this.Age,
      Hobby: this.Hobby,
      Name: this.Name,
      ContactDetails : this.ContactDetails,
      Created: this.Created,
    };
  }

  updatePersonalDetails(personalDetails: IPersonalDetails) {
    if (!this.Name) this.Name = {};
    this.Name.Firstname = personalDetails.Firstname
      ? personalDetails.Firstname
      : this.Name.Firstname;
    this.Name.Lastname = personalDetails.Lastname
      ? personalDetails.Lastname
      : this.Name.Lastname;
    this.apply(new PersonalDetailsUpdatedEvent(this.toJSON()));
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

