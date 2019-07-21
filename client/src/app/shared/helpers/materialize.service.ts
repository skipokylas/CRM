import { ElementRef } from '@angular/core';
import { MaterialInstance } from '../interfaces';

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

  static initModal(modalRef: ElementRef): MaterialInstance {
    return M.Modal.init(modalRef.nativeElement);
  }

  static initTooltip(tooltipRef: ElementRef): MaterialInstance {
    return M.Tooltip.init(tooltipRef.nativeElement);
  }
}
