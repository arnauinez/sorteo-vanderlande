import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Member } from 'src/app/_models/member';
import { SoundsService } from 'src/app/_services/sounds.service';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent implements OnInit {
  public winner: Member;
  private ttl: number;

  constructor(
    private dialog: MatDialogRef<WinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { m: Member, ttl: number},
    private soundService: SoundsService) {
      this.winner = data.m;
      this.ttl = data.ttl;
  }

  ngOnInit() {
    this.soundService.win1();

    if (this.ttl !== -1) {
      setTimeout(() => {
        this.dialog.close();
      }, this.ttl);
    }

  }

}
