
import { UserCreatedEvent } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import {  ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeedSagas {
  // @Saga()
  // onUserCreated = (events$: Observable<any>): Observable<IExample> => {
  //   return events$.pipe(
  //     ofType(UserCreatedEvent),
  //     map(
  //       (event: UserCreatedEvent) =>
  //         new CreateProfileCommand({ user: event.user })
  //     )
  //   );
  // };
}