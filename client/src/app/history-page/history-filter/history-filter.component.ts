import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IFilter, IMaterialDatepicker } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/helpers/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy {
  @Output() filterEmitter: EventEmitter<IFilter> = new EventEmitter();
  @ViewChild('start', { static: true }) startRef: ElementRef;
  @ViewChild('end', { static: true }) endRef: ElementRef;

  start: IMaterialDatepicker;
  end: IMaterialDatepicker;
  order: number;

  isValid = true;

  constructor() {}

  ngOnInit() {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

  submitFilter() {
    const filter: IFilter = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.filterEmitter.emit(filter);
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }
}
