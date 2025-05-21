import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({providedIn: 'root'})
export class BaseService {
  protected http = inject(HttpClient);
  protected readonly baseUrl: string = 'http://localhost:8000/api';

  protected handleError(error: HttpErrorResponse) {
    console.error('Erro detalhado:', error);

    let errorMessage = 'Ocorreu um erro na requisição';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}/${endpoint}`).pipe(
      map(res => res.results),
      catchError(this.handleError)
    );
  }

  getObject<T>(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  postObject<T>(endpoint: string, object: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}/`, object).pipe(
      catchError(this.handleError)
    );
  }

  deleteObject(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  putObject<T>(endpoint: string, obj: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/`, obj).pipe(
      catchError(this.handleError)
    );
  }
}
