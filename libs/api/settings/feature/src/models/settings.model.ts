
import { IExample } from '@mp/api/settings/util'
import { NotImplementedException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class example extends AggregateRoot implements IExample {
  constructor(
    public userId: string
    //need to add these
    //public privacyDetails?: IPrivacyDetails | null | undefined,
    //public created?: FirebaseFirestore.Timestamp | null | undefined
  ) {
    super();
  }

  create() {
    return new NotImplementedException
  }

}
