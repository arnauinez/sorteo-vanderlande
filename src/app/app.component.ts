import { Component } from '@angular/core';
import sampleData from '../assets/input.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sorteo';
}

console.log(sampleData);
