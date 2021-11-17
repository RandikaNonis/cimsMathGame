import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {NgxSpinnerService} from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('opacity', [
      state('hide', style([{opacity: 0}])),
      state('show', style([{opacity: 1}])),
      transition('hide => show', [animate(500)])
    ]),
  ]
})
export class SignUpComponent implements OnInit {

  signUp = 'hide';
  firstName = '';
  lastName = '';
  userName = '';
  password = '';
  reEnterPassword = '';

  constructor(private router: Router, private gameService: GameService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.signUp = 'show';
    }, 1000);
  }

  submit(): void {
    if (this.firstName === '' || this.lastName === '' || this.userName === '' || this.password === '' ||
      this.reEnterPassword === '') {
      Swal.fire({
        title: 'Info!',
        text: 'Fields can not be empty',
        icon: 'info',
        confirmButtonText: 'Cool'
      });
    } else if (this.password !== this.reEnterPassword) {
      Swal.fire({
        title: 'Info!',
        text: 'Passwords are not matching',
        icon: 'info',
        confirmButtonText: 'Cool'
      });
    } else {
      const data = {
        username: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        highestScore: 0,
        rank: 0
      };
      this.spinner.show();
      this.gameService.signUp(data).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res) {
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            title: 'Info!',
            text: 'Username already exist',
            icon: 'info',
            confirmButtonText: 'Cool'
          });
        }
      }, error1 => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
        console.log(error1);
      });
    }
  }
}
