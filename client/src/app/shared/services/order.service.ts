import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: IOrder): Observable<IOrder> {
    console.log(order);
    return this.http.post<IOrder>('/api/order', order);
  }
}
