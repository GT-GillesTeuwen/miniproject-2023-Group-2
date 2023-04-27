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
  @Input() major!: string;
  @Input() hobbies!: string[] | null | undefined;

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

    //INTERESTS FUNCTIONALITY
    showGames = false;
    showFootball = false;
    showReading = false;
    showMusic = false;
    showWriting = false;
    showBasketball = false;
    showGym = false;
    showArt = false;
    showPhotography = false;
    showTravel = false;
    showTakeOut = false;
    showWine = false;
    showFishing = false;
    showIceCream = false;
    showPets = false;
    showSpace = false;

  constructor(
    private elRef: ElementRef,
    private windowRef: Window) {

  }

  ngOnInit(){
    console.log("hobbies: ", this.photos);
    if (this.hobbies?.includes("games"))
          this.showGames = true;
        if (this.hobbies?.includes("football"))
          this.showFootball = true;
        if (this.hobbies?.includes("reading"))
          this.showReading = true;
        if (this.hobbies?.includes("music"))
          this.showMusic = true;
        if (this.hobbies?.includes("writing"))
          this.showWriting = true;
        if (this.hobbies?.includes("basketball"))
          this.showBasketball = true;
        if (this.hobbies?.includes("gym"))
          this.showGym = true;
        if (this.hobbies?.includes("art"))
          this.showArt = true;
        if (this.hobbies?.includes("photography"))
          this.showPhotography = true;
        if (this.hobbies?.includes("travel"))
          this.showTravel = true;
        if (this.hobbies?.includes("takeOut"))
          this.showTakeOut = true;
        if (this.hobbies?.includes("wine"))
          this.showWine = true;
        if (this.hobbies?.includes("fishing"))
          this.showFishing = true;
        if (this.hobbies?.includes("iceCream"))
          this.showIceCream = true;
        if (this.hobbies?.includes("pets"))
          this.showPets = true;
        if (this.hobbies?.includes("space"))
          this.showSpace = true;
  }



}
