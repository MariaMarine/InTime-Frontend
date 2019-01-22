import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReportsResolverService implements Resolve<Observable<any>> {

  public constructor(private readonly http: HttpClient) {}

  public resolve(): Observable<any> {

    console.log('Hi');
    return this.http
      .get(
        `http://localhost:3000/table-reports`
      )
      .pipe();
  }
}
