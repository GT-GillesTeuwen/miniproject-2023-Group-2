import { Component, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Logout } from '@mp/app/auth/util'

@Component({
  selector: 'mp-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.scss'],
})
export class VerifyPageComponent {
  @ViewChild('input1') input1!: IonInput;
  @ViewChild('input2') input2!: IonInput;
  @ViewChild('input3') input3!: IonInput;
  @ViewChild('input4') input4!: IonInput;

  onInputChange(currentInput: IonInput, nextInput: IonInput, previousInput: IonInput) {
    if(currentInput.value?.toString.length == 0){
      if(previousInput.name != 'input0'){
        previousInput.setFocus();
      }
    }
    if (nextInput) {
      nextInput.setFocus();
    }
  }

  constructor(private readonly store: Store){}
  
  acceptedValues = ["0","1","2","3","4","5","6","7","8","9"];
  i = 0;

  checkKey(event: KeyboardEvent, currentInput: IonInput, nextInput: IonInput, previousInput: IonInput): void{
    if (event.key === "Backspace") {
      if(previousInput.name != 'input0'){
        currentInput.value = "";
        previousInput.setFocus();
        if(previousInput.name == 'input3'){
          event.preventDefault();
        }
      }
    }else{
      if(this.acceptedValues.includes(event.key)){
        currentInput.value = event.key;
        if (nextInput.name != 'input0') {
          nextInput.setFocus();
          event.preventDefault();
        }
      }
    }
  }

  checkInput(event: any, currentInput: IonInput){
    if(!this.acceptedValues.includes(event.target.value)){
        currentInput.value = "";
    }
  }

  logout(){
    this.store.dispatch(new Logout());
  }
}
