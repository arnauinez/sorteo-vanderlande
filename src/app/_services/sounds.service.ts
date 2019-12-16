import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  constructor() {}

  audioMap: {
    clack: HTMLAudioElement,
    win1: HTMLAudioElement
  };

  sound: HTMLAudioElement;

  load = () => {
    // this.audioMap = new Map<string, string>();
    const audiosrc = '../../../assets/sounds';
    // this.audioMap.set(audiosrc + 'clack', '/clack.mp3');
    // this.audioMap.set(audiosrc + 'win', '/win1.mp3');

    this.audioMap = {
      clack: new Audio(`${audiosrc}/clack.mp3`),
      win1: new Audio(`${audiosrc}/win1.mp3`),
    };
    console.log("AudioMap ", this.audioMap);
    
  }

  clack = () => {
    const clack: HTMLAudioElement = this.audioMap.clack;
    clack.load();
    clack.play();
  }

  win1 = () => {
    const win: HTMLAudioElement = this.audioMap.win1;
    win.play();
  }


}
