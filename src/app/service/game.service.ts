import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  // check player credentials
  login(username, password): Observable<any> {
    return this.http.get(environment.baseUrl + '/game/login/' + username + '/' + password);
  }

  // add new player
  signUp(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/game/insertUser', data);
  }

  // get player details by username
  getDetailsByUsername(username): Observable<any> {
    return this.http.get(environment.baseUrl + '/game/getUserByUserName/' + username);
  }

  // update level of player
  updateRank(username): Observable<any> {
    return this.http.put(environment.baseUrl + '/game/updateLevel', username);
  }

  // external API use for calculation
  getAnswer(expression): Observable<any> {
    return this.http.get('http://api.mathjs.org/v4/?expr=' + expression);
  }

}
