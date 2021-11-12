import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

// ES6 Modules or TypeScript

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('opacity', [
      state('hide', style([{opacity: 0}])),
      state('show', style([{opacity: 1}])),
      transition('hide => show', [animate(500)])
    ]),
  ]
})
export class LoginComponent implements OnInit {

  login = 'hide';

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.login = 'show';
    }, 1000);
  }

}
