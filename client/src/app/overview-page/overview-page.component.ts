import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { IOverview, IMaterialInstance } from '../shared/interfaces';
import { MaterialService } from '../shared/helpers/materialize.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  @ViewChild('tapTarget', { static: true }) tapTargetRef: ElementRef;

  $overview: Observable<IOverview>;
  tapTarget: IMaterialInstance;
  yesterday = new Date();

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.$overview = this.analyticsService.getOverview();
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

  openInfo() {
    this.tapTarget.open();
  }
}
