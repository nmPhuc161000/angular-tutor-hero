import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
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

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.apiUrl}/${hero.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(`Calling PUT API: ${url}`);  // Console log trước khi gọi API
    return this.http.put<Hero>(url, hero, httpOptions)
      .pipe(
        tap(() => console.log(`Hero updated: id=${hero.id}`)),  // Console log khi API trả về kết quả
        catchError(this.handleError<any>('updateHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log lỗi vào console
      return of(result as T);
    };
  }
}
