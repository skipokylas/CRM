import { ElementRef } from '@angular/core';
import { MaterialModalInstance } from '../interfaces';

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

  static initModal(modalRef: ElementRef): MaterialModalInstance {
    return M.Modal.init(modalRef.nativeElement);
  }
}
