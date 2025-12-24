import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { SkipLoading } from "../../UI";
import { LoadingService } from "../services";

export const LoadingInterceptor = 
    (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
        if(req.context.get(SkipLoading)) {
            return next(req);
        }
        const loadingService = inject(LoadingService);
        loadingService.loadingOn();
        return next(req)
            .pipe(
                finalize(() => {
                    loadingService.loadingOff()
                })
            )
}