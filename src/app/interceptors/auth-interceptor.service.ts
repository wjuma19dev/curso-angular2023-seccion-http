import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor {

    intercept( req: HttpRequest<any>, next: HttpHandler ) {
        
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'sdfdsfsdgfgfgdfgfgfg'),
            // url: 'e-new-url' // can change the url before send a petition
        })

        // return next.handle(authReq);

        // Tambien puedo recibir aqui la respuesta del servidor, pipe al next
        return next.handle(authReq).pipe(
            tap(event => {

                if( event.type === HttpEventType.Response ) {

                    console.log(event.body)
                }
            })
        )

    }
}