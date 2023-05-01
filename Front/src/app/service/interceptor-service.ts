import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {
constructor(private tokenService:TokenService){}

InterceptorService(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let intReq = req;
    const token= this.tokenService.getToken();
    if(token != null){
        intReq = req.clone({
            headers: req.headers.set('Authorizarion','Bearer'+token)
        });

    }
    return next.handle(intReq);
}

}

export const InterceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true

}]