import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class LoaderComponent {
  // On injecte ton service
  private loadingService = inject(LoadingService);

  // On récupère l'état (si ton service utilise un Signal)
  // Si ton service utilise un Observable, utilise : isLoading = this.loadingService.loading$;
  protected isLoading = this.loadingService.isLoading; 
}