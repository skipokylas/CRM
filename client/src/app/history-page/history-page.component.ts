import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MaterialInstance } from '../shared/interfaces';
import { MaterialService } from '../shared/helpers/materialize.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  @ViewChild('tooltip', { static: true }) tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;

  constructor() {}

  ngOnInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }
}
