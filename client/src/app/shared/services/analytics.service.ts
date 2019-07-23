import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOverview, IAnalytics } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<IOverview> {
    return this.http.get<IOverview>('/api/analytics/overview');
  }

  getAnalytics(): Observable<IAnalytics> {
    return this.http.get<IAnalytics>('/api/analytics/analytics');
  }
}
