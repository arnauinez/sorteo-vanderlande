import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Member } from '../_models/member';
import { AppConfigService } from '../_services/app-config.service';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

let delay = 50;
const MAX_LENGTH = 21;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
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
  public colorIndex = 0;

  private startSubscribed = false;
  private dataSubscribed = false;
  private running = false;

  @Input() startSubject: BehaviorSubject<void>;
  @Input() dataSubject: BehaviorSubject<Member[]>;

  @Output() winnerEvent: EventEmitter<Member> = new EventEmitter();

  constructor(private AppConfig: AppConfigService, private detector: ChangeDetectorRef) { }

  ngOnInit() {
    this.members = this.AppConfig.members;

    this.startSubject.subscribe(_ => {
        !this.startSubscribed ? this.startSubscribed = !this.startSubscribed : this.startRuffle();
    });

    this.dataSubject.subscribe(_members => {
      !this.dataSubscribed ? this.dataSubscribed = !this.dataSubscribed : this.onFetch(_members);
    })
  }

  onFetch = (members: Member[]) => {
    console.log(`Members received when running = ${this.running}`, members);

    if (!this.running) {
      this.members = members;
      this.clearBuffer();
      this.generateRandomMembers();
      // this.detector.detectChanges();
    }

    console.log('Updated', this.members);
    
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
        this.running = true;
        this.start();
      } else {
        this.running = false;
        this.getWinner();
      }
    }, delay);
  }

  generateRandomMembers = () => {
    while (this.currentMembers.length < MAX_LENGTH) {
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

  startRuffle = () => {
    delay = 50;
    // this.generateRandomMembers();

    setInterval(() => {
        delay += this.increment();
        // animation_delay = delay / 2;
    }, delay);

    this.start();
  }

  getWinner = () => {
    const winnerIndex = (MAX_LENGTH - 1) / 2;
    const winner: Member = this.currentMembers[winnerIndex];
    console.log('Winner ...', winnerIndex, winner, this.currentMembers);
    this.winnerEvent.emit(winner);
  }

  clearBuffer = () => {
    while(this.currentMembers.length > 0) {
      setTimeout(() => {
        console.log('clearing buffer...');
        this.currentMembers.shift();
      }, 200);
    }
  }
}
