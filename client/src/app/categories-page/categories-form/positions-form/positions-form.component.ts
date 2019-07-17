import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { PositionService } from 'src/app/shared/services/position.service';
import { IPosition, MaterialModalInstance } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/helpers/materialize.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, OnDestroy {
  @Input() categoryId;
  @ViewChild('modal', { static: true }) modalRef;

  positions: IPosition[] = [];
  loading = false;
  modal: MaterialModalInstance;

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });

    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  onSelectPosion(position: IPosition) {
    this.modal.open();
  }

  onAddPosition() {
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }
}
