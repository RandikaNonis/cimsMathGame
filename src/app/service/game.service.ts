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

  login(username, password): Observable<any> {
    return this.http.get(environment.baseUrl + '/game/login/' + username + '/' + password);
  }

  signUp(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/game/insertUser', data);
  }

  getDetailsByUsername(username): Observable<any> {
    return this.http.get(environment.baseUrl + '/game/getUserByUserName/' + username);
  }
}
