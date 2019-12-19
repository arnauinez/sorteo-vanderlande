import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Member } from '../_models/member';
import { AppConfigService } from '../_services/app-config.service';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from '../_services/sounds.service';
import { ɵangular_packages_platform_browser_platform_browser_e } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';


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
  private winnersList: Member[] = [];
  public currentMembers: Member[] = [];
  public colorIndex = 0;
  public incrementStepDelay = 0.65;

  private startSubscribed = false;
  private dataSubscribed = false;
  private running = false;

  @Input() startSubject: BehaviorSubject<void>;
  @Input() dataSubject: BehaviorSubject<Member[]>;

  @Output() winnerEvent: EventEmitter<Member> = new EventEmitter();

  private delayInterval: any;

  constructor(
    private AppConfig: AppConfigService,
    private detector: ChangeDetectorRef,
    private soundService: SoundsService) { }

  ngOnInit() {
    this.members = this.AppConfig.members;

    this.startSubject.subscribe(_ => {
        !this.startSubscribed ? this.startSubscribed = !this.startSubscribed : this.startRuffle();
    });

    this.dataSubject.subscribe(_members => {
      !this.dataSubscribed ? this.dataSubscribed = !this.dataSubscribed : this.onFetch(_members);
    });
  }

  onFetch = (members: Member[]) => {
    console.log(`Members received when running = ${this.running}`, members);

    if (!this.running) {
      this.members = members;
      this.generateRandomMembers(true);
      // this.detector.detectChanges();
    }

    console.log('Updated', this.members);
  }

  increment = () => {
    console.log("Delay --> ", delay);
    return Math.pow(delay, this.incrementStepDelay);
  }

  start = () => {
    setTimeout(() => {
      const member = this.getRandomMember();
      this.currentMembers.shift();
      this.currentMembers.forEach(m => {
        m.moving = !m.moving;
      });
      this.currentMembers.push(member);
      this.soundService.clack();
      if (delay < 1200) {
        // console.log(delay);
        this.running = true;
        this.start();
      } else {
        this.onStop();
      }
    }, delay);
  }

  onStop = () => {
    this.running = false;
    this.getWinner();

    clearInterval(this.delayInterval);


  }

  generateRandomMembers = async (firstTimeExecution) => {

    if (this.currentMembers.length > 0) {
      await this.clearCurrentMembers();
    }

    while (this.currentMembers.length < MAX_LENGTH) {
      await this.pushRandomMember();
    }
  }

  clearCurrentMembers = async () => {
    while (this.currentMembers.length > 0) {
      await this.popMember();
    }
  }

  popMember = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.currentMembers.shift();
      setTimeout(() => {
        resolve();
      }, 25);
    });
  }

  pushRandomMember = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const member = this.getRandomMember();
      this.currentMembers.push(member);

      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  getRandomMember = () => {
    ++this.colorIndex;
    while (true) {
      const index: number = Math.floor(Math.random() * this.members.length);
      const member: Member = this.members[index];

      if (!this.currentMembers.includes(member) && !this.winnersList.includes(member)) {
        member.color = this.colorIndex;
        return member;
      }
    }
  }

  startRuffle = () => {
    delay = 50;
    this.delayInterval = setInterval(() => {
      delay += this.increment();
    }, delay);

    this.start();
  }

  getWinner = () => {
    const winnerIndex = (MAX_LENGTH - 1) / 2;
    const winner: Member = this.currentMembers[winnerIndex];
    this.winnerEvent.emit(winner);
    this.winnersList.push(winner);
  }
}
