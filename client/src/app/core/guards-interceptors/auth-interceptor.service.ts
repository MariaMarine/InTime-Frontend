import { StorageService } from './../storage.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly storageService: StorageService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let modifiedReq: HttpRequest<any> = req;

           const token = this.storageService.getItem('token');

      modifiedReq = token
        ? req.clone({
            headers: req.headers
              .set('Authorization', 'Bearer ' + token)
              .set('Content-Type', 'application/json')
          })
        : req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
          });


    return next.handle(modifiedReq);
  }
}
