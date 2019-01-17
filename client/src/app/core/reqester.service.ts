import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequesterService {
  public constructor(private readonly http: HttpClient) {}

  public get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { headers });
  }

  public post<T, R>(
    url: string,
    body: T,
    headers?: HttpHeaders
  ): Observable<R> {
    return this.http.post<R>(url, body, { headers });
  }

  public put<T, R>(url: string, body: T, headers?: HttpHeaders): Observable<R> {
    return this.http.put<R>(url, body, { headers });
  }

  public delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers });
  }
}
