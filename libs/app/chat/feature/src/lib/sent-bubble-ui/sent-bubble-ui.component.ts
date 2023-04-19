import { Component, Input } from '@angular/core';

@Component({
  selector: 'mp-sent-bubble-ui',
  templateUrl: './sent-bubble-ui.component.html',
  styleUrls: ['./sent-bubble-ui.component.scss'],
})
export class SentBubbleUiComponent {
  @Input() imgSrc!: string;
}
