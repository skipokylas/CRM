import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService } from '../shared/helpers/materialize.service';
import { MaterialModalInstance, IOrderPosition, IOrder } from '../shared/interfaces';
import { OrderPositionService } from '../shared/helpers/order-position.service';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderPositionService]
})
export class OrderPageComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modalRef: ElementRef;
  modal: MaterialModalInstance;
  isRoot: boolean;
  panding = false;

  constructor(
    private router: Router,
    public orderPositionService: OrderPositionService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });

    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  openModal() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.panding = true;
    const order: IOrder = {
      list: this.orderPositionService.list.map(item => {
        delete item._id;
        return item;
      })
    };
    console.log(order);
    this.orderService.create(order).subscribe(
      res => MaterialService.toast(`Order #${res.order} was added`),
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close();
        this.orderPositionService.clear();
        this.panding = false;
      }
    );
  }

  removePosition(orderPosition: IOrderPosition) {
    this.orderPositionService.remove(orderPosition);
  }
}
