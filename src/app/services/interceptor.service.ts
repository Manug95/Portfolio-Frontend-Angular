import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private autenticationService: AutenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let currentUser = this.autenticationService.getUserAutenticated();
    let requestConToken = req;
    
    if (currentUser && currentUser.token) {
      console.log("hola2");
      requestConToken = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    //console.log("El interceptor esta corriendo: " + JSON.stringify(currentUser));
    //console.log("token: " + requestConToken.headers.get("Authorization") + " - " + requestConToken.headers.has("Authorization"));
    
    return next.handle(requestConToken);
  }
}
