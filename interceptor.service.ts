import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class InterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("Your request is on the way...");
        const modUrlReq = req.clone({
            headers: req.headers.append('Authentication', 'Gaurav')
        })
        return next.handle(modUrlReq).pipe(tap(event => {
            // console.log(event);
            if(event.type === HttpEventType.Response)
            {
                // console.log("Response is here.");
                // console.log('Event Body: ', event.body);
            }
        }));
    }
}