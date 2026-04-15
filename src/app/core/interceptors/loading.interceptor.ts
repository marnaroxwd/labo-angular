import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "@core/services/loading.service";
import { finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.show(); // Incrémente le compteur (+1)

  return next(req).pipe(
    finalize(() => {
      loadingService.hide(); // Décrémente le compteur (-1)
    })
  );
};