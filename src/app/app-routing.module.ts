import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
