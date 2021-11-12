import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.login = 'show';
    }, 1000);
  }

  submit() {
    if (this.userName === '' || this.password === '') {
      Swal.fire({
        title: 'Info!',
        text: 'Fields can not be empty',
        icon: 'info',
        confirmButtonText: 'Cool'
      });
    } else {
      if (this.userName === 'randika' && this.password === '123') {
        this.router.navigate(['/game']);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Credentials',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    }
  }

}
