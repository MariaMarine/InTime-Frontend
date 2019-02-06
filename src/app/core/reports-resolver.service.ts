import { RequesterService } from './reqester.service';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReportsResolverService implements Resolve<Observable<any>> {

  public constructor(private readonly http: RequesterService) {}

  public resolve(): Observable<any> {
    return this.http
      .get(
        `https://intime-backend-server.herokuapp.com/table-reports`
      );
  }
}
