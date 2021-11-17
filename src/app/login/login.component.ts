import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {GameService} from "../service/game.service";

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
        confirmButtonText: 'Cool'
      });
    } else {
      this.spinner.show();
      this.gameService.login(this.userName, this.password).subscribe(async res => {
        if (res) {
          await new Promise(resolve => {
            this.gameService.getDetailsByUsername(this.userName).subscribe((resp: any) => {
              sessionStorage.setItem('userDetails', JSON.stringify(resp));
              resolve();
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
          });
          this.spinner.hide();
          this.router.navigate(['/game']);
        } else {
          this.spinner.hide();
          Swal.fire({
            title: 'Error!',
            text: 'Invalid Credentials',
            icon: 'error',
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
