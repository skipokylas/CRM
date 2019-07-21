import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { PositionService } from 'src/app/shared/services/position.service';
import { IPosition, MaterialInstance, IMessage } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/helpers/materialize.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  positionId = null;
  modal: MaterialInstance;
  form: FormGroup;

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    this.initForm();
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });

    this.modal = MaterialService.initModal(this.modalRef);
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  onSelectPosion(position: IPosition): void {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterialService.UpdateTextInputs();
  }

  onAddPosition(): void {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1
    });
    this.modal.open();
    MaterialService.UpdateTextInputs();
  }

  onCancel(): void {
    this.modal.close();
  }

  onDelete(event: Event, position: IPosition): void {
    event.stopPropagation();
    const decision = window.confirm(`Do you really want to delete: ${position.name}`);
    if (decision) {
      this.positionService.delete(position).subscribe(
        (response: IMessage) => {
          this.positions.splice(this.findIndex(position), 1);
          MaterialService.toast(response.message);
        },
        error => {
          MaterialService.toast(error.error.message);
        }
      );
    }
  }

  onSubmit(): void {
    this.form.disable();
    const position: IPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };

    this.positionId ? this.updatePosition(position) : this.createPosition(position);
  }

  createPosition(position: IPosition) {
    this.positionService.create(position).subscribe(
      (createdPosition: IPosition) => {
        MaterialService.toast(`Position: ${createdPosition.name} was updated`);
        this.positions.push(createdPosition);
      },
      (error: HttpErrorResponse) => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      },
      () => {
        this.modal.close();
        this.form.reset({ name: null, cost: 1 });
        this.form.enable();
      }
    );
  }

  updatePosition(position: IPosition) {
    position._id = this.positionId;
    this.positionService.update(position).subscribe(
      (updatedPosition: IPosition) => {
        MaterialService.toast(`Position: ${updatedPosition.name} was updated`);
        this.positions[this.findIndex(position)] = position;
      },
      (error: HttpErrorResponse) => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      },
      () => {
        this.modal.close();
        this.form.reset({ name: null, cost: 1 });
        this.form.enable();
      }
    );
  }

  findIndex(position: IPosition): number {
    return this.positions.findIndex((p: IPosition) => p._id === position._id);
  }
}
