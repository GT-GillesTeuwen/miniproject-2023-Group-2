import {AfterViewInit, Component, ElementRef, EventEmitter,Output, ViewChild,Input} from '@angular/core';

import {
  Host,
  Element,
  Event,
  h,
} from '@stencil/core';

import {ProfileState} from '@mp/app/profile/data-access'
import { Observable } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';
import { Select, Store } from '@ngxs/store';

import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import {window} from "rxjs";


@Component({
  selector: 'mp-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements AfterViewInit{
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  gestureHostElement: HTMLElement | undefined;
  @Output() matchUsers = new EventEmitter;
  @Input() photos!: string[]|null|undefined;
  @Input() firstname!: string;
  @Input() surname!: string;
  @Input() age!: string;
  @Input() bio!: string;

 // @ViewChild('card-item') swipeableCard : HTMLElement;
  gestureSetup(){
    //this.initGesture();
  }

  //async initGesture() {}

  ngAfterViewInit() {

    this.gestureHostElement = this.elRef.nativeElement.querySelector('#card-item');

    this.initGesture();
  }

  async initGesture(){
    const style = this.gestureHostElement?.style
    const windowWidth = this.windowRef.innerWidth;

    if(!style || !windowWidth) return;

    const gestureOptions: GestureConfig = {
      el: this.gestureHostElement as HTMLElement,
      gestureName: "tinder-swipe",
      onStart: () => {
        style.transition = 'none';
      },
      onMove: (ev) => {
        style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`;
      },
      onEnd: (ev) => {
        style.transition = '0.3s ease-out';

        if (ev.deltaX > windowWidth / 2) {
          style.transform = `translateX(${windowWidth * 1.5}px)`;
          this.matchUsers.emit(true);
        } else if (ev.deltaX < -windowWidth / 2) {
          style.transform = `translateX(-${windowWidth * 1.5}px)`;
          this.matchUsers.emit(false);
        } else {
          style.transform = '';
        }
      }
    }

    const gesture: Gesture = await createGesture(gestureOptions);

    gesture.enable();

  }

  constructor(
    private elRef: ElementRef,
    private windowRef: Window) {

  }




}
