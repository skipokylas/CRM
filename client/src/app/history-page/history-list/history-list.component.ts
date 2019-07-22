import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IOrder, MaterialInstance } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/helpers/materialize.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnDestroy {
  @Input() orders: IOrder[];
  @ViewChild('modal', { static: true }) modalRef: ElementRef;

  modal: MaterialInstance;
  selectedOrder: IOrder;
  constructor() {}

  ngOnInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  ngOnDestroy() {
    this.modal.destroy();
  }

  calculatePrice(order: IOrder): number {
    return order.list.reduce((total, item) => (total += item.quantity * item.cost), 0);
  }

  selectOrder(order: IOrder) {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }
}
