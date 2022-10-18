import { Injectable } from '@angular/core';
import { State, Timer, Type } from '../../shared/models/timer.model';
import { TimerDefaults } from '../../shared/timer-defaults.constant';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public timer: Timer = {
    mins: TimerDefaults.DEFAULT_WORK,
    secs: 0,

    state: 'start',
    type: 'work'
  };

  constructor() { }

  setState(value: State): void {
    this.timer.state = value;
  }

  setType(value: Type): void {
    this.timer.type = value;
    this.setTimerValues(this.getTimeValues(value), 0);
  }

  getTimeValues(value: Type): number {
    switch (value) {
      case 'work':
        return TimerDefaults.DEFAULT_WORK;
      case 'break':
        return TimerDefaults.DEFAULT_SHORTBREAK;
      case 'longbreak':
        return TimerDefaults.DEFAULT_LONGBREAK;
    }
  }

  setTimerValues(minute: Timer["mins"], second: Timer["secs"]): void {
    this.timer.mins = minute;
    this.timer.secs = second;
  }
}
