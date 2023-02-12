import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<any> {
    return this.http.get('http://127.0.0.1:9002/api/cars');
  }

  getCarsWithRefresh(): Observable<any[]> {
    return interval(1000).pipe(
      switchMap(() => this.getCars())
    );
  }

  voteForCar(carId: string): Observable<any> {
    return this.http.post(
      `http://127.0.0.1:9002/api/cars/vote?carId=${carId}`, {}
    );
  }
}
