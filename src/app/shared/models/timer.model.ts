export type State = 'start' | 'stop';

export type Type = 'work' | 'break' | 'longbreak';

export interface Timer {
    mins: number,
    secs: number,
    state: State,
    type: Type
}