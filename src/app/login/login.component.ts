import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {GameService} from '../service/game.service';

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
  userName = '';
  password = '';

  constructor(private router: Router, private spinner: NgxSpinnerService, private gameService: GameService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.login = 'show';
    }, 1000);
  }

  submit(): void {
    if (this.userName === '' || this.password === '') {
      Swal.fire({
        title: 'Info!',
        text: 'Fields can not be empty',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } else {
      this.spinner.show('mainSpinner');
      this.gameService.login(this.userName, this.password).subscribe(async res => {
        if (res) {
          localStorage.setItem('username', this.userName);
          this.spinner.hide('mainSpinner');
          this.router.navigate(['/intro']);
        } else {
          this.spinner.hide('mainSpinner');
          Swal.fire({
            title: 'Error!',
            text: 'Invalid Credentials',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }, error1 => {
        this.spinner.hide('mainSpinner');
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.log(error1);
      });
    }
  }

}
