import { ElementRef } from '@angular/core';
import { IMaterialInstance } from '../interfaces';

declare var M: any;
export class MaterialService {
  static toast(message: string): void {
    M.toast({ html: message });
  }

  static initializeFloatingButton(ref: ElementRef): void {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static UpdateTextInputs(): void {
    M.updateTextFields();
  }

  static initModal(modalRef: ElementRef): IMaterialInstance {
    return M.Modal.init(modalRef.nativeElement);
  }

  static initTooltip(tooltipRef: ElementRef): IMaterialInstance {
    return M.Tooltip.init(tooltipRef.nativeElement);
  }

  static initDatepicker(datepickerRef: ElementRef, onClose: () => void): IMaterialInstance {
    return M.Datepicker.init(datepickerRef.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    });
  }

  static initTapTarget(tapTargetRef: ElementRef): IMaterialInstance {
    return M.TapTarget.init(tapTargetRef.nativeElement);
  }
}
