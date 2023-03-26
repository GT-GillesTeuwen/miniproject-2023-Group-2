import {
    PrivacyDetailsUpdatedEvent,
} from '@mp/api/settings/util';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class SettingsSagas {
  @Saga()
  onPrivacyDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(PrivacyDetailsUpdatedEvent),
      map(
        (event: PrivacyDetailsUpdatedEvent) =>
          NotImplementedException
      )
    );
  };
}
