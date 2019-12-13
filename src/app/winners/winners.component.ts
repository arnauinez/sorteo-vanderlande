import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../_models/member';
import { TextColor } from '../_models/text-color';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: Member[] = [
    {
      id: 0,
      Nombre: "Arnau",
      Apellido: "Martinez",
      moving: false,
      color: TextColor["#3699c7FF"]
    },
    {
      id: 0,
      Nombre: "Arnau",
      Apellido: "Martinez",
      moving: false,
      color: TextColor["#3699c7FF"]
    },
    {
      id: 0,
      Nombre: "Arnau",
      Apellido: "Martinez",
      moving: false,
      color: TextColor["#3699c7FF"]
    },
    {
      id: 0,
      Nombre: "Arnau",
      Apellido: "Martinez",
      moving: false,
      color: TextColor["#3699c7FF"]
    },
  ];
  private clearSubscribed: boolean;

  @Input() clearSubject: BehaviorSubject<void>;
  @Input() winnerSubject: BehaviorSubject<Member>;

  constructor() { }

  ngOnInit() {
    this.clearSubject.subscribe(_ => {
      this.clearSubscribed ? this.clear() : this.clearSubscribed = !this.clearSubscribed;
    });

    this.winnerSubject.subscribe((winner: Member) => {
      console.log('Received winner', winner);
      if (winner) {
        this.winners.push(winner);
      }
    });
  }

  clear = () => {
    this.winners = [];
  }

}
