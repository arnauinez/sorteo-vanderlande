import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../_models/member';
import { WidthCalculator } from '../helpers/width-calculator';
import { TextColor } from '../_models/text-color';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() data: { member: Member, index: number };

  constructor() { }

  ngOnInit() { }

  getWidth = () => {
    const index = this.data.index;
    return WidthCalculator.getWidthPercent(index);
  }

  getFontSize = (): number => {
    const width = this.getWidth();
    const size = WidthCalculator.getFontSize(width);
    return size;
  }

  isMiddleRow = () => {
    return this.data.index === 7;
  }

  getBackground = () => {
    const color =  TextColor[this.data.member.color % 4];
    return color;
  }
  
  getRotation = () => {
    return WidthCalculator.getRotatationX(this.data.index);
  }

}
