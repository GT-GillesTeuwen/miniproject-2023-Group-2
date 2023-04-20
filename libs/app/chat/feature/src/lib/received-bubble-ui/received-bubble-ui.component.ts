import { Component, Input } from '@angular/core';

@Component({
  selector: 'mp-received-bubble-ui',
  templateUrl: './received-bubble-ui.component.html',
  styleUrls: ['./received-bubble-ui.component.scss'],
})
export class ReceivedBubbleUiComponent {
  @Input() messageContent!: string;
}
