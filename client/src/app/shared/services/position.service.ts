import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPosition } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {
  constructor(private http: HttpClient) {}

  fetch(categoryId: string): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(`/api/position/${categoryId}`);
  }
}
