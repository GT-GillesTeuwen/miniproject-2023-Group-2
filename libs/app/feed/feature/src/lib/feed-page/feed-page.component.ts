import { Component } from '@angular/core';
import {FeedApi} from '@mp/app/feed/data-access';
import {Observable, switchMap} from "rxjs";
import {IProfile} from "@mp/api/profiles/util";

@Component({
  selector: 'mp-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
})
export class FeedPageComponent {

  userFeed$: Observable<IProfile[]> | undefined;

  constructor(private feedApi: FeedApi) {
    this.userFeed$ = feedApi.getProfileSuggestions();
    // feedApi.getProfileSuggestions()
    //   .pipe( switchMap( value=> {
    //     console.log('Returned data', value);
    //     return value;
    //   })).subscribe();
  }
}
