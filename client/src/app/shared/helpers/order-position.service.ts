import { Injectable } from '@angular/core';
import { IPosition, IOrderPosition } from '../interfaces';

@Injectable()
export class OrderPositionService {
  list: IOrderPosition[] = [];
  price = 0;

  add(position: IPosition): void {
    const orderPosition: IOrderPosition = Object.assign(
      {},
      {
        name: position.name,
        cost: position.cost,
        quantity: position.quantity,
        _id: position._id
      }
    );
    const candidate = this.list.find(p => p._id === position._id);

    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.calculatePrice();
  }

  remove(orderPosition: IOrderPosition) {
    const idx = this.list.findIndex(op => op._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.calculatePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private calculatePrice(): void {
    this.price = this.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }
}
