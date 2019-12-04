import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { AppConfigService } from '../_services/app-config.service';
import { trigger, transition, animate, style, state } from '@angular/animations';

let speed = 50;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('moving', style({
      })),
      state('idle', style({
      })),
      transition('moving <=> idle', [
        animate('0.6s ease-out', style({
          transform: 'translateY(-100%)',
          'background-color': 'transparent'
        }))
      ]),
      transition(':enter', [
        animate('0.6s ease', style({
          transform: 'translateY(-110%)',
        }))
      ]),
      transition(':leave', [
        animate('0.6s ease', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class ListsComponent implements OnInit {
  MAX_SPEED: number = 50;
  MIN_SPEED: number = 1500;

  public members: Member[];
  public currentMembers: Member[] = [];

  // public speed: number = 50;
  public increment: boolean = true;

  constructor(private AppConfig: AppConfigService) { }

  ngOnInit() {
    this.members = this.AppConfig.members;

    this.generateRandomMembers();

    setInterval(() => {
      speed += 10 * (this.increment ? 1 : -1);
    }, 50);

    this.start();
  }
  
  start = () => {
    setTimeout(() => {
      const member = this.getRandomMember();
      this.currentMembers.shift();

      this.currentMembers.push(member);

      if (speed < this.MAX_SPEED || speed > this.MIN_SPEED) {
        this.increment = !this.increment;
      }

      this.currentMembers.forEach(m => {
        m.moving = !m.moving;
      });

      this.start();
    }, speed);
  }

  generateRandomMembers = () => {
    while (this.currentMembers.length < 5) {
      const member = this.getRandomMember();
      this.currentMembers.push(member);
    }
  }

  getRandomMember = () => {
    while (true) {
      const index: number = Math.floor(Math.random() * this.members.length);
      const member: Member = this.members[index];

      if (!this.currentMembers.includes(member)) {
        return member;
      }
    }
  }
}
