import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // Le signal est privé pour éviter que n'importe qui puisse le modifier directement
  private _isLoading = signal<boolean>(false);

  // On expose une version en lecture seule pour le composant
  public readonly isLoading = this._isLoading.asReadonly();

  show() {
    this._isLoading.set(true);
  }

  hide() {
    this._isLoading.set(false);
  }
}