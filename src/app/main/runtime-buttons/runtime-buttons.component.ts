import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InputRoute } from 'src/app/_models/input-route';

@Component({
  selector: 'app-runtime-buttons',
  templateUrl: './runtime-buttons.component.html',
  styleUrls: ['./runtime-buttons.component.scss']
})
export class RuntimeButtonsComponent implements OnInit {

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();
  // tslint:disable-next-line: no-output-native
  @Output() start: EventEmitter<void> = new EventEmitter<void>();
  @Output() fetch: EventEmitter<InputRoute> = new EventEmitter<InputRoute>();

  constructor() { }

  ngOnInit() {
  }

  startEvent = () => {
    this.start.emit();
  }

  clearEvent = () => {
    this.clear.emit();
  }

  fetchEvent1 = () => {
    this.fetch.emit(InputRoute.List1);
  }

  fetchEvent2 = () => {
    this.fetch.emit(InputRoute.List2);
  }
}
