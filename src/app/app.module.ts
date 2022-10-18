import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PomodoroComponent } from './views/pomodoro/pomodoro.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { DisplayTimePipe } from './shared/pipes/displayTime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PomodoroComponent,
    HeaderComponent,
    FooterComponent,
    DisplayTimePipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
