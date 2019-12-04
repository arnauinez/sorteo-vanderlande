import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() data: { member: Member, index: number };

  constructor() { }

  ngOnInit() {


    console.log(this.data);
    console.log(this.data.index);
    
  }
  y = (index: number) => {
    return ;
  }

  getWidth = () => {
    return this.y(this.data.index);
  }

}
