import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*
@Injectable()
export class TableReportsResolverService implements Resolve<Observable<any>> {

  public constructor(private readonly http: HttpClient) {}

  public resolve(devices, period): Observable<any> {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    console.log(url);
    return this.http.get(url).pipe();
  }
}
*/
