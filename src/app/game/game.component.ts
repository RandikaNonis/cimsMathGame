import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CoronaService} from '../corona.service';

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

  array = [
    {
      type: 'C',
      show: '1+1'
    },
    {
      type: 'A',
      show: '50'
    },
    {
      type: 'C',
      show: '10/2'
    },
    {
      type: 'A',
      show: '1'
    },
    {
      type: 'C',
      show: '2*3'
    },
    {
      type: 'A',
      show: '9'
    },
    {
      type: 'C',
      show: '7-3'
    },
    {
      type: 'A',
      show: '2'
    },
    {
      type: 'C',
      show: '1*6'
    },
    {
      type: 'A',
      show: '43'
    },
    {
      type: 'C',
      show: '40+3'
    },
    {
      type: 'A',
      show: '6'
    },
    {
      type: 'C',
      show: '10/5'
    },
    {
      type: 'A',
      show: '4'
    },
    {
      type: 'C',
      show: '9+0'
    },
    {
      type: 'A',
      show: '6'
    },
    {
      type: 'C',
      show: '3-2'
    },
    {
      type: 'A',
      show: '5'
    },
    {
      type: 'C',
      show: '5*10'
    },
    {
      type: 'A',
      show: '2'
    }];

  currentState = ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal',
    'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'];

  animating = 'up';
  details;
  clickedTile = {
    clickedRound: 0,
    recentValue: 0,
    clickedValue: 0,
    recentIndex: 0,
    lastIndex: 0,
  };

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
    console.log(this.clickedTile);
    this.currentState[index] = this.currentState[index] === 'normal' ? 'animated' : 'normal';

    this.clickedTile.clickedRound += 1;
    this.clickedTile.recentValue = this.clickedTile.clickedValue;
    // tslint:disable-next-line:no-eval
    this.clickedTile.clickedValue = eval(this.array[index]?.show);
    this.clickedTile.recentIndex = this.clickedTile?.lastIndex;
    this.clickedTile.lastIndex = index;

    if (this.clickedTile.clickedRound < 20) {
      console.log(this.clickedTile?.clickedRound % 2);
      if (this.clickedTile?.clickedRound % 2 === 0) {
        // tslint:disable-next-line:no-eval
        if (this.clickedTile.clickedValue !== this.clickedTile.recentValue) {
          setTimeout(() => {
            this.currentState[this.clickedTile.recentIndex] = 'normal';
            this.currentState[index] = 'normal';
            this.clickedTile.clickedRound -= 2;
          }, 1000);
        }
      }
    } else {
      setTimeout(() => {
        alert('Won the game');
      }, 1000);
    }
  }

  clear(): void {
    for (let i = 0; i < this.currentState.length; i++) {
      this.currentState[i] = 'normal';
    }
    this.clickedTile = {
      clickedRound: 0,
      recentValue: 0,
      clickedValue: 0,
      recentIndex: 0,
      lastIndex: 0,
    };
  }
}
