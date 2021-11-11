import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CoronaService} from '../corona.service';
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

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

  array = [];

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
    recentType: '',
    lastType: ''
  };

  pointerEvent = false;
  interval;

  constructor(private service: CoronaService, private spinner: NgxSpinnerService, private alertService: AlertService) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.spinner.show();
    await this.setMathematicalPart();
    setTimeout(() => {
      this.animating = 'down';
    }, 100);
    this.service.getCurrentDetailsOfCoronaPandemic().subscribe(res => {
      this.details = res?.data;
    });
    setTimeout(() => {
      this.spinner.hide();
      this.runTheCountDown();
    }, 2000);
  }

  // tslint:disable-next-line:typedef
  setMathematicalPart() {
    return new Promise(async resolve => {
      this.array = [];
      await this.makeCalculations();
      const answers = await this.setAnswers();
      this.shuffle(this.array.concat(answers));
      resolve();
    });
  }

  // tslint:disable-next-line:typedef
  makeCalculations() {
    return new Promise(async resolve => {
      await new Promise(resolve => {
        for (let i = 0; i < 3; i++) {
          this.array.push(
            {
              type: 'C',
              show: Math.floor(Math.random() * 10) + '+' + Math.floor(Math.random() * 10)
            });
          if (i + 1 === 3) {
            resolve();
          }
        }
      });
      await new Promise(resolve => {
        for (let i = 0; i < 3; i++) {
          const firstOne = Math.floor(Math.random() * 10);
          this.array.push(
            {
              type: 'C',
              show: firstOne + '-' + Math.floor(Math.random() * firstOne)
            });
          if (i + 1 === 3) {
            resolve();
          }
        }
      });
      await new Promise(resolve => {
        for (let i = 0; i < 2; i++) {
          this.array.push(
            {
              type: 'C',
              show: Math.floor(Math.random() * 10) + '*' + Math.floor(Math.random() * 10)
            });
          if (i + 1 === 2) {
            resolve();
          }
        }
      });
      await new Promise(resolve => {
        for (let i = 0; i < 2; i++) {
          const firstOne = Math.floor(Math.random() * 10);
          const min = Math.ceil(1);
          this.array.push(
            {
              type: 'C',
              show: firstOne + '/' + Math.floor(Math.random() * (firstOne - min) + min)
            });
          if (i + 1 === 2) {
            resolve();
          }
        }
      });
      resolve();
    });
  }

  // tslint:disable-next-line:typedef
  async setAnswers() {
    const answers = [];

    return new Promise(resolve => {
      for (let i = 0; i < this.array.length; i++) {
        answers.push({
          type: 'A',
          // tslint:disable-next-line:no-eval
          show: eval(this.array[i]?.show)
        });
        if (i + 1 === this.array.length) {
          resolve(answers);
        }
      }
    });
  }

  shuffle(array) {
    console.log(array);
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    this.array = array;
    console.log(this.array);
  }

  runTheCountDown(): void {
    const countDownDate: any = new Date(new Date().getTime() + (2 * 60000));

    this.interval = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let realMins;
      let realSecs;

      if (minutes < 10) {
        realMins = '0' + minutes;
      } else {
        realMins = minutes;
      }
      if (seconds < 10) {
        realSecs = '0' + seconds;
      } else {
        realSecs = seconds;
      }

      document.getElementById('minutesOne').innerHTML = realMins.toString().substring(0, 1);
      document.getElementById('minutesTwo').innerHTML = realMins.toString().substring(1, 2);
      document.getElementById('secondsOne').innerHTML = realSecs.toString().substring(0, 1);
      document.getElementById('secondsTwo').innerHTML = realSecs.toString().substring(1, 2);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.interval);
        document.getElementById('minutesOne').innerHTML = '0';
        document.getElementById('minutesTwo').innerHTML = '0';
        document.getElementById('secondsOne').innerHTML = '0';
        document.getElementById('secondsTwo').innerHTML = '0';
        this.alertService.danger('Game Over');
        this.pointerEvent = true;
      }

    }, 1000);
  }

  changeState(index: number): void {
    this.currentState[index] = this.currentState[index] === 'normal' ? 'animated' : 'normal';

    this.clickedTile.clickedRound += 1;
    this.clickedTile.recentValue = this.clickedTile.clickedValue;
    this.clickedTile.recentType = this.clickedTile.lastType;
    // tslint:disable-next-line:no-eval
    this.clickedTile.clickedValue = eval(this.array[index]?.show);
    this.clickedTile.lastType = this.array[index]?.type;
    this.clickedTile.recentIndex = this.clickedTile?.lastIndex;
    this.clickedTile.lastIndex = index;

    if (this.clickedTile.clickedRound < 20) {
      if (this.clickedTile?.clickedRound % 2 === 0) {
        this.pointerEvent = true;
        // tslint:disable-next-line:no-eval
        if ((this.clickedTile.clickedValue !== this.clickedTile.recentValue) ||
          (this.clickedTile?.recentType === this.clickedTile?.lastType)) {
          setTimeout(() => {
            this.currentState[this.clickedTile.recentIndex] = 'normal';
            this.currentState[index] = 'normal';
            this.clickedTile.clickedRound -= 2;
            this.pointerEvent = false;
          }, 1000);
        } else {
          this.pointerEvent = false;
        }
      }
    } else {
      setTimeout(() => {
        clearInterval(this.interval);
        this.alertService.success('Congratulations ! You won');
      }, 1000);
    }
  }

  // tslint:disable-next-line:typedef
  async clear() {
    this.spinner.show();
    for (let i = 0; i < this.currentState.length; i++) {
      this.currentState[i] = 'normal';
    }
    await this.setMathematicalPart();
    this.pointerEvent = false;
    this.clickedTile = {
      clickedRound: 0,
      recentValue: 0,
      clickedValue: 0,
      recentIndex: 0,
      lastIndex: 0,
      recentType: '',
      lastType: ''
    };
    clearInterval(this.interval);
    this.runTheCountDown();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
