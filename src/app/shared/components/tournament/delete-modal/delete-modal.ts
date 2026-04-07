import { Component, input, output } from '@angular/core';
import { Button } from "../../button/button";

@Component({
    selector: 'app-delete-modal',
    imports: [Button],
    templateUrl: './delete-modal.html',
    styleUrl: './delete-modal.css',
})
export class DeleteModal {
itemName = input.required<string>();
  onConfirm = output<void>();
  onCancel = output<void>(); // L'événement que le parent doit écouter

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit(); // On prévient le parent qu'on veut fermer
  }
}
