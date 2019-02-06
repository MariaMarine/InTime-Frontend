import { RequesterService } from './reqester.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DeviceResolverService implements Resolve<Observable<any>> {

  public constructor(private readonly http: RequesterService) {}

  public resolve(): Observable<any> {
    return this.http
      .get(
        `http://localhost:3000/devices`
      );
  }
}
