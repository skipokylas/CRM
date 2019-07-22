import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrder } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('/api/order', order);
  }

  fetch(params: any = {}): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }
}
