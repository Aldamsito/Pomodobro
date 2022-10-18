import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../shared/services/timer.service';
import { State, Type, Timer } from '../../shared/models/timer.model'

import { faStop, faPlay, faPause, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const timerAudioSrc: string = '../../assets/sfx-timer.mp3';
const btnAudioSrc: string = '../../assets/sfx-button.mp3';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit {

  faStop = faStop;
  faPlay = faPlay;
  faPause = faPause;
  faForwardStep = faForwardStep;

  private pomodoroCount: number = 0;
  private timerAudio = new Audio();
  private btnAudio = new Audio();


  public timer!: Timer;
  private interval!: any;

  public get Interval(): any {
    return this.interval;
  }

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
    this.timer = this.timerService.timer;
    this.timerAudio.src = timerAudioSrc;
    this.btnAudio.src = btnAudioSrc;
  }

  playTimer() {
    this.timerAudio.play().then(() => {
      this.timerAudio.currentTime = 0;
      this.timerAudio.pause();
    });
  }

  playButton() {
    this.btnAudio.currentTime = .5;
    this.btnAudio.volume = .4;
    this.btnAudio.play();
  }

  changeState(): void {
    const newState: State = (this.timer.state === 'start') ? 'stop' : 'start';
    this.timerService.setState(newState);

    if (this.timer.state === 'start') {
      this.setTimerOff();
    }
    else if (this.timer.state === 'stop') {
      this.setTimerOn();
    }
  }

  setTimerType(type: Type): void {
    this.resetTimer();
    this.timerService.setType(type);
    this.backgroundByType();
  }
  backgroundByType(): void {
    switch (this.timer.type) {
      case 'work':
        document.body.style.backgroundColor = "var(--indian-red)";
        break;
      case 'break':
        document.body.style.backgroundColor = "var(--ming)";
        break;
      case 'longbreak':
        document.body.style.backgroundColor = "var(--blue-sapphire)";
        break;
    }
  }

  changeType(): void {
    const longbreak: boolean = this.pomodoroCount > 8;
    const newType = longbreak ? 'longbreak' : (this.pomodoroCount % 2 === 0) ? 'break' : 'work';
    if (longbreak)
      this.pomodoroCount = 1;
    this.timerService.setType(newType);
    this.backgroundByType();
  }

  setTimerOn(): void {
    this.playTimer();
    this.interval = setInterval(() => {
      this.decreaseTimer();

      if (this.isTimerOver()) {
        this.increasePomodoro();
        this.resetTimer();
        this.timerAudio.play();
      }
    }, 1000);
  }

  setTimerOff(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  decreaseTimer(): void {
    if (this.timer.secs === 0) {
      this.timer.secs = 59;
      this.timer.mins--;
    } else
      this.timer.secs--;
  }

  increasePomodoro(): void {
    this.pomodoroCount++;
    this.changeType();
  }

  skipTimer(): void {
    this.setTimerOff();
    this.timerService.setState('start');
    this.increasePomodoro();
  }

  resetTimer(): void {
    this.setTimerOff();
    this.timerService.setState('start');
    this.timerService.setType('work');
    this.pomodoroCount = 1;
    this.timerService.setTimerValues(this.timerService.getTimeValues(this.timer.type), 0);
  }

  isTimerOver(): boolean {
    return this.timer.mins === 0 && this.timer.secs === 0;
  }

}

