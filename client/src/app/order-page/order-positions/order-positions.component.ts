import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from 'src/app/shared/services/position.service';
import { Observable } from 'rxjs';
import { IPosition } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { OrderPositionService } from 'src/app/shared/helpers/order-position.service';
import { MaterialService } from 'src/app/shared/helpers/materialize.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  $positions: Observable<IPosition[]>;
  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private orderService: OrderPositionService
  ) {}

  ngOnInit() {
    this.$positions = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionService.fetch(params['id']);
      }),
      map((positions: IPosition[]) => {
        return positions.map((position: IPosition) => {
          position.quantity = 1;
          return position;
        });
      })
    );
  }

  addToOrder(position: IPosition) {
    this.orderService.add(position);
    MaterialService.toast(`Added x${position.quantity}`);
  }
}
