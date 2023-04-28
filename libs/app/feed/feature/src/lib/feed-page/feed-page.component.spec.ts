import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import {FeedApi} from '@mp/app/feed/data-access';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeedPageComponent } from './feed-page.component';
import { of } from 'rxjs';

//describe('FeedPageComponent', () => {
//  let component: FeedPageComponent;
//  let fixture: ComponentFixture<FeedPageComponent>;
//  let FeedMock: any;
//
//  beforeEach(async () => {
//
//
//    FeedMock = {
//      subscribe: jest.fn(),
//      getProfileSuggestion: () => of({}),
//      dispatch: jest.fn()
//    }
//
//    await TestBed.configureTestingModule({
//      declarations: [FeedPageComponent],
//      imports: [NgxsModule.forRoot([])],
//      providers: [{provide: FeedApi, useValue: FeedMock}],
//      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
//    }).compileComponents();
//
//    fixture = TestBed.createComponent(FeedPageComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });
//
//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
//});
//