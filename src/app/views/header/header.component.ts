import { Component, OnInit } from '@angular/core';
import { faClock, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faClock = faClock;
  faBars = faBars;
  
  constructor() { }

  ngOnInit(): void {
  }

}
