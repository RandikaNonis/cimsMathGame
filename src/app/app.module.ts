import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AlertModule} from 'ngx-alerts';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    // @ts-ignore
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
