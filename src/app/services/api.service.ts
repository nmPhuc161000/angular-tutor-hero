import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://6647120b51e227f23ab0f658.mockapi.io/heros';

  constructor(private http: HttpClient) { }

  //lay du lieu ra tu api
  getData(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  getHeroById(id: number): Observable<Hero> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Hero>(url)
  }

  //cap nhat du lieu tu api
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

  //xoa du lieu tu api
  deleteHero(id: number): Observable<Hero[]> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(`Calling DELETE API: ${url}`);
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(() => console.log(`Hero deleted: id=${id}`)),
      catchError(this.handleError<any>('deleteHero')),
      switchMap(() => this.getData())
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log lỗi vào console
      return of(result as T);
    };
  }
}
