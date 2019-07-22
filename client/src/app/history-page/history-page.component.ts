import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IMaterialInstance, IOrder, IFilter } from '../shared/interfaces';
import { MaterialService } from '../shared/helpers/materialize.service';
import { OrderService } from '../shared/services/order.service';
import { Subscription } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

const STEP = 2;
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  @ViewChild('tooltip', { static: true }) tooltipRef: ElementRef;
  tooltip: IMaterialInstance;
  isFilterVisible = false;
  loading = false;
  reloading = false;
  noMoreOrders = false;
  offset = 0;
  orders: IOrder[] = [];
  filter: IFilter = {};

  limit = STEP;
  $onSub: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.reloading = true;
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
    this.fetch();
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.$onSub.unsubscribe();
  }

  fetch(): void {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.$onSub = this.orderService.fetch(params).subscribe((orders: IOrder[]) => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }

  loadMore(): void {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  onFilter(filter: IFilter): void {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return !!Object.keys(this.filter).length;
  }
}
