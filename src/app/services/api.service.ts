import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://6647120b51e227f23ab0f658.mockapi.io/heros';

  constructor(private http: HttpClient) { }

  getData(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }
}
