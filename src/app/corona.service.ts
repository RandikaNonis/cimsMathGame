import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscribable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  constructor(private http: HttpClient) {
  }

  getCurrentDetailsOfCoronaPandemic(): Subscribable<any> {
    return this.http.get('https://www.hpb.health.gov.lk/api/get-current-statistical');
  }
}
