import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CoronaService} from "../corona.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('card', [
      state('normal', style([{transform: 'rotateY(0deg)'}])),
      state('animated', style([{transform: 'rotateY(90deg)'}])),
      transition('*=> *', [animate(500)])
    ]),
    trigger('show', [
      state('up', style([{top: '-1300px'}])),
      state('down', style([{top: '0'}])),
      transition('up => down', [animate(1000)])
    ]),
  ]
})
export class GameComponent implements OnInit {

  array = ['1+1', '9-2', '50', '99', '5*4', '7', '25', '8', '10/1', '50', '144', '9*11', '12*12', '2*2', '1*25', '2*4',
    '4', '10', '5*10', '20'];

  currentState = ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
    'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'];

  animating = 'up';
  details;

  constructor(private service: CoronaService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.animating = 'down';
    }, 100);
    this.service.getCurrentDetailsOfCoronaPandemic().subscribe(res => {
      console.log(res);
      this.details = res?.data;
    });
  }

  changeState(index: number): void {
    this.currentState[index] = this.currentState[index] === 'normal' ? 'animated' : 'normal';
  }

  clear() {
    for (let i = 0; i < this.currentState.length; i++) {
      this.currentState[i] = 'normal';
    }
  }
}
