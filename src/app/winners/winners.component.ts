import { Component, OnInit, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../_models/member';
import { TextColor } from '../_models/text-color';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: Member[] = [];
  private clearSubscribed: boolean;

  @Input() clearSubject: BehaviorSubject<void>;
  @Input() winnerSubject: BehaviorSubject<Member>;


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.clearSubject.subscribe(_ => {
      this.clearSubscribed ? this.clear() : this.clearSubscribed = !this.clearSubscribed;
    });

    this.winnerSubject.subscribe((winner: Member) => {
      console.log('Received winner', winner);
      if (winner) {

        const dialog = this.dialog.open(WinnerDialogComponent, {
          data: {m: winner, ttl: -1},
          width: '100vw',
          height: '100vh',
          // panelClass: 'winner-dialog'
        });
    
        dialog.afterClosed().subscribe(_ => {
          this.winners.unshift(winner);
        });

      }
    });
  }

  clear = () => {
    this.winners = [];
  }

}
