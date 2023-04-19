import {
    ExampleExampleExampleEvent,
    ExampleExampleExampleCommand
} from '@mp/api/feed/util';
import { UserCreatedEvent } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { IExample, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExampleSagas {
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<IExample> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        (event: UserCreatedEvent) =>
          new CreateProfileCommand({ user: event.user })
      )
    );
  };

  
}