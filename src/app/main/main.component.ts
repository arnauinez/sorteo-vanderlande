import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InputRoute } from '../_models/input-route';
import { Member } from '../_models/member';
import list1 from '../../assets/List1.json';
import list2 from '../../assets/List2.json';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private startSubject: BehaviorSubject<void> = new BehaviorSubject(null);
  private clearSubject: BehaviorSubject<void> = new BehaviorSubject(null);
  private dataSubject: BehaviorSubject<{ list: Member[], name: string}> = new BehaviorSubject(null);
  private winnerSubject: BehaviorSubject<Member> = new BehaviorSubject(null);

  private fetch1Promise: Promise<Member[]>;
  private fetch2Promise: Promise<Member[]>;

  constructor() { }

  ngOnInit() {
    this.fetch1Promise = new Promise<Member[]>((resolve, reject) => {
      const members = list1;
      console.log('LIST 1', members);
      resolve(members);
    });

    this.fetch2Promise = new Promise<Member[]>((resolve, reject) => {
      const members = list2;
      console.log('LIST 2', members);
      resolve(members);
    });
  }

  start = () => {
    this.startSubject.next();
  }

  clear = () => {
    this.clearSubject.next();
  }

  fetch = async (inputRoute: InputRoute) => {
    console.log('called', inputRoute);
    const promise = this.getPromise(inputRoute);

    try {
      const list = await promise;
      const name = this.name(inputRoute);
      this.dataSubject.next({list, name});
    } catch (err) {
      console.error(err);
    }

    // // TODO send data to List Component
    // promise.then(members => {
    //   this.dataSubject.next(members);
    // }).catch(err => {
    //   console.log('blab bla');
    //   console.error(err);
    // });
  }

  name = (inputRoute: InputRoute) => {
    console.log(inputRoute);
    switch (inputRoute) {
      case InputRoute.List1:
        return 'Lijst een';
      case InputRoute.List2:
        return 'Lijst twee';
    }
  }

  getPromise = (inputRoute: InputRoute): Promise<Member[]> => {
    let promise: Promise<Member[]>;
    switch (inputRoute) {
      case InputRoute.List1:
        promise = this.fetch1Promise;
        break;
      case InputRoute.List2:
        promise = this.fetch2Promise;
        break;
      default:
        break;
    }

    return promise;
  }

  notifyWinner = (winner: Member) => {
    this.winnerSubject.next(winner);
  }
}
