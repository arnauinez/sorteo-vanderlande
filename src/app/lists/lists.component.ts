import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { AppConfigService } from '../_services/app-config.service';
import { trigger, transition, animate, style, state } from '@angular/animations';

let delay = 50;

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
        animate(delay, style({
          transform: 'translateY(-100%)',
          'background-color': 'transparent'
        }))
      ]),
      transition(':enter', [
        animate(delay, style({
          transform: 'translateY(-110%)',
        }))
      ]),
      transition(':leave', [
        animate(delay, style({
          opacity: 0,
        }))
      ])
    ])
  ]
})

export class ListsComponent implements OnInit {
  public members: Member[];
  public currentMembers: Member[] = [];
  public colorIndex: number = 0; 

  constructor(private AppConfig: AppConfigService) { }

  ngOnInit() {
    this.members = this.AppConfig.members;

    this.generateRandomMembers();

    setInterval(() => {
        delay += this.increment();
        // animation_delay = delay / 2;
    }, delay);

    this.start();
  }

  increment = () => {
    return Math.pow(delay, 0.2);
  }

  start = () => {
    setTimeout(() => {
      const member = this.getRandomMember();
      this.currentMembers.shift();

      this.currentMembers.forEach(m => {
        m.moving = !m.moving;
      });
      this.currentMembers.push(member);
      if (delay < 1200) {
        console.log(delay);
        this.start();
      }
    }, delay);
  }

  generateRandomMembers = () => {
    while (this.currentMembers.length < 15) {
      const member = this.getRandomMember();
      this.currentMembers.push(member);
    }
  }

  getRandomMember = () => {
    ++this.colorIndex;
    while (true) {
      const index: number = Math.floor(Math.random() * this.members.length);
      const member: Member = this.members[index];

      if (!this.currentMembers.includes(member)) {
        member.color = this.colorIndex;
        return member;
      }
    }
  }
}
