import { Component, ViewChild, ElementRef } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionsExecuting, actionsExecuting } from '@ngxs-labs/actions-executing';

import { SaveProfileChanges, SubscribeToProfile, UpdateProfilePhotos } from '../../util/src/profile.actions';

import { Logout } from '@mp/app/auth/util'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { IAgeRange } from 'libs/api/profiles/util/src/interfaces/age-range.interface';


@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  @Select(ProfileState.allProfiles) matches$!: Observable<IProfile[] | null>;

  @Select(ProfileState.profilePhotos) photo$!:Observable<String>;

  @Select(actionsExecuting([SaveProfileChanges])) busy$!: Observable<ActionsExecuting>;
  profileChangesForm = this.fb.group({
    aboutMe: [ '', [ Validators.maxLength(300)],],
    major: [ '', [ Validators.maxLength(50)],],
    phone: [ '', [ Validators.minLength(10), Validators.maxLength(10)],],
    //Send hobbies aswell, you hard-working developer. We love you Stacy and Arne. Thanks for reading this
  });

  //TEXT COUNTERS FOR INPUTS
  aboutMeText!: string;
  majorText!: string;
  phoneText!: string;
  hobbiesText!: string[];
  profilePhotosArr: string[]=[];
  profileCompleteText = 0;

  
  changeMade = false;
  alreadyChangedHobby = false;

  remainingAboutMeChars = 300;
  remainingMajorChars = 50;

  onAboutMeChange(event:any) {
    const inputLength = event.target.value.length;
    this.remainingAboutMeChars = 300 - inputLength;
    this.changeMade = true;
  }

  onMajorChange(event:any) {
    const inputLength = event.target.value.length;
    this.remainingMajorChars = 50 - inputLength;
    this.changeMade = true;
  }

  onPhoneChange(event: any) {
    // check if key entered was a digit
    this.changeMade = true;
  }

  get aboutMe() {
    return this.aboutMeText;
  }

  get major(){
    return this.majorText;
  }

  get phone(){
    return this.phoneText;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {
    
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    console.log("AHH");
    this.store.select(ProfileState.profilePhotos).subscribe((array) => {
      this.profilePhotosArr=[];
      if(array!=undefined){
        for (let index = 0; index < array.length; index++) {
          this.profilePhotosArr.push(array[index]);
        }
      }else{
        // this.store.dispatch(new SubscribeToProfile());
      }
      
    });
    
    
  }

  ngOnInit(){
    this.showGamesTick = false;
    this.showFootballTick = false;
    this.showReadingTick = false;
    this.showMusicTick = false;
    this.showWritingTick = false;
    this.showBasketballTick = false;
    this.showGymTick = false;
    this.showArtTick = false;
    this.showPhotographyTick = false;
    this.showTravelTick = false;
    this.showTakeOutTick = false;
    this.showWineTick = false;
    this.showFishingTick = false;
    this.showIceCreamTick = false;
    this.showPetsTick = false;
    this.showSpaceTick = false;
    this.alreadyChangedHobby = false;

    let doOnceBio = true;
    let doOnceMajor = true;
    let doOnceCell = true;
    let doOnceHobby = true;

    this.profile$.forEach(value => {
      if(value?.Bio){
        if(doOnceBio){
          this.profileCompleteText += 25;
          doOnceBio = false;
        }
        this.aboutMeText = value.Bio;
        this.remainingAboutMeChars = 300 - this.aboutMeText.length;
      }
      if(value?.ContactDetails?.Cell){
        if(doOnceCell){
          this.profileCompleteText += 25;
          doOnceCell = false;
        }
        this.phoneText = value.ContactDetails.Cell;
      }
      if(value?.Major){
        if(doOnceMajor){
          this.profileCompleteText += 25;
          doOnceMajor = false;
        }
        this.majorText = value.Major;
        this.remainingMajorChars = 50 - this.majorText.length;
      }
      if(value?.Hobby){
        this.hobbiesText = value.Hobby;
        if(this.hobbiesText.length != 0){
          if(doOnceHobby){
            this.profileCompleteText += 25;
            doOnceHobby = false;
            this.alreadyChangedHobby = true;
          }
          if (this.hobbiesText.includes("games"))
            this.showGamesTick = true;
          if (this.hobbiesText.includes("football"))
            this.showFootballTick = true;
          if (this.hobbiesText.includes("reading"))
            this.showReadingTick = true;
          if (this.hobbiesText.includes("music"))
            this.showMusicTick = true;
          if (this.hobbiesText.includes("writing"))
            this.showWritingTick = true;
          if (this.hobbiesText.includes("basketball"))
            this.showBasketballTick = true;
          if (this.hobbiesText.includes("gym"))
            this.showGymTick = true;
          if (this.hobbiesText.includes("art"))
            this.showArtTick = true;
          if (this.hobbiesText.includes("photography"))
            this.showPhotographyTick = true;
          if (this.hobbiesText.includes("travel"))
            this.showTravelTick = true;
          if (this.hobbiesText.includes("takeOut"))
            this.showTakeOutTick = true;
          if (this.hobbiesText.includes("wine"))
            this.showWineTick = true;
          if (this.hobbiesText.includes("fishing"))
            this.showFishingTick = true;
          if (this.hobbiesText.includes("iceCream"))
            this.showIceCreamTick = true;
          if (this.hobbiesText.includes("pets"))
            this.showPetsTick = true;
          if (this.hobbiesText.includes("space"))
            this.showSpaceTick = true;
        }else{
          if(doOnceHobby){
            doOnceHobby = false;
          }
        }
      }
    });
  }

  //IMAGES MODAL
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  progress = 0;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Perform any action you want with the file, such as uploading it to a server
      
      const storage = getStorage();
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
          this.progress = progress;
          if(this.progress == 1){
            this.progress = 0.9;
            setInterval(() => {
              this.progress += 0.01;
            }, 300);
          }
          
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.profilePhotosArr.push(downloadURL);
            console.log(this.profilePhotosArr);
            this.store.dispatch(new UpdateProfilePhotos(this.profilePhotosArr));
          });
        }
      );
    }
  }

  //INTERESTS FUNCTIONALITY
  showGamesTick = false;
  showFootballTick = false;
  showReadingTick = false;
  showMusicTick = false;
  showWritingTick = false;
  showBasketballTick = false;
  showGymTick = false;
  showArtTick = false;
  showPhotographyTick = false;
  showTravelTick = false;
  showTakeOutTick = false;
  showWineTick = false;
  showFishingTick = false;
  showIceCreamTick = false;
  showPetsTick = false;
  showSpaceTick = false;

  //Save changes
  currentCell!: string;
  async saveChanges() {
    
   
    if (this.changeMade) {

      if((this.aboutMeText == "" || this.aboutMeText == undefined) && this.getAboutMeValue() != ""){
        this.aboutMeText = this.getAboutMeValue();
      }

      if((this.phoneText == "" || this.phoneText == undefined) && this.getPhoneValue() != ""){
        this.phoneText = this.getPhoneValue();
      }

      if((this.majorText == "" || this.majorText == undefined) && this.getMajorValue() != ""){
        this.majorText = this.getMajorValue();
      }
      

      const hobbies: string[] = [];
      if (this.showGamesTick)
        hobbies.push("games");
      if (this.showFootballTick)
        hobbies.push("football");
      if (this.showReadingTick)
        hobbies.push("reading");
      if (this.showMusicTick)
        hobbies.push("music");
      if (this.showWritingTick)
        hobbies.push("writing");
      if (this.showBasketballTick)
        hobbies.push("basketball");
      if (this.showGymTick)
        hobbies.push("gym");
      if (this.showArtTick)
        hobbies.push("art");
      if (this.showPhotographyTick)
        hobbies.push("photography");
      if (this.showTravelTick)
        hobbies.push("travel");
      if (this.showTakeOutTick)
        hobbies.push("takeOut");
      if (this.showWineTick)
        hobbies.push("wine");
      if (this.showFishingTick)
        hobbies.push("fishing");
      if (this.showIceCreamTick)
        hobbies.push("iceCream");
      if (this.showPetsTick)
        hobbies.push("pets");
      if (this.showSpaceTick)
        hobbies.push("space");

        console.log("hobbies: ", hobbies);
      this.store.dispatch(new SaveProfileChanges(this.aboutMeText, this.majorText, this.phoneText, hobbies));

      //UPDATE COMPLETION OF HOBBIES

      if(hobbies.length > 0){
        if(!this.alreadyChangedHobby){
          this.profileCompleteText += 25;
          this.alreadyChangedHobby = true;
        }
      }else{
        if(this.alreadyChangedHobby){
          this.profileCompleteText -= 25;
          this.alreadyChangedHobby = false;
        }
      }

      this.changeMade = false;
    }
  }

  @ViewChild('currentAboutMe') currentAboutMe?: ElementRef;
  @ViewChild('currentPhone') currentPhone?: ElementRef;
  @ViewChild('currentMajor') currentMajor?: ElementRef;
  @ViewChild('profilePhotos') profilePhotos?: ElementRef;

  getAboutMeValue() {
    return this.currentAboutMe?.nativeElement.innerText;
  }

  getPhoneValue() {
    return this.currentPhone?.nativeElement.innerText;
  }

  getMajorValue() {
    return this.currentMajor?.nativeElement.innerText;
  }

  getProfilePhotos() {
    
    return this.profilePhotos?.nativeElement.innerText;
  }

  //Logout
  logout() {
    this.showGamesTick = false;
    this.showFootballTick = false;
    this.showReadingTick = false;
    this.showMusicTick = false;
    this.showWritingTick = false;
    this.showBasketballTick = false;
    this.showGymTick = false;
    this.showArtTick = false;
    this.showPhotographyTick = false;
    this.showTravelTick = false;
    this.showTakeOutTick = false;
    this.showWineTick = false;
    this.showFishingTick = false;
    this.showIceCreamTick = false;
    this.showPetsTick = false;
    this.showSpaceTick = false;
    this.changeMade = false;
    this.alreadyChangedHobby = false;
    this.aboutMeText = "";
    this.majorText = "";
    this.phoneText = "";
    this.profileCompleteText = 0;
    this.store.dispatch(new Logout());
  }

  //check if profile photos array is empty:
  isPhotosArrayAtIndexEmpty(index: number){
    // Process the index here
    let result;
    if(this.profilePhotosArr.length-1 < index){
      result = true;
    }else{
      result = false;
    }
    return result; // Return the result
  }

  //remove image from array:
  removeImageFromArray(index: number){
    this.profilePhotosArr.splice(index, 1);
    this.store.dispatch(new UpdateProfilePhotos(this.profilePhotosArr));
  }
}
