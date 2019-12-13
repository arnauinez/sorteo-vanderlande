import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
// import input from '../../assets/input.json';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private static members: Member[];

constructor() { }

load() {
  // AppConfigService.members = input;
  // console.log(AppConfigService.members);
}


public get members(): Member[] {
  return AppConfigService.members;
}

}
