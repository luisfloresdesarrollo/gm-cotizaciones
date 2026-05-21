import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://tu-api.com/api'; // 🔧 Cambia esto por tu URL base

  constructor(private http: HttpClient) {}

  // ─────────────────────────────────────────────
  // GET
  // ─────────────────────────────────────────────
  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────
  // POST
  // ─────────────────────────────────────────────
  post<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────
  // PUT
  // ─────────────────────────────────────────────
  put<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────
  // PATCH
  // ─────────────────────────────────────────────
  patch<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, body, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────────
  delete<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────
  // UPLOAD (multipart/form-data)
  // ─────────────────────────────────────────────
  upload<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, formData)
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────
  // Construcción de opciones HTTP
  // ─────────────────────────────────────────────
  private buildOptions(options?: RequestOptions): object {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();

    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers = headers.set(key, value);
      });
    }

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        params = params.set(key, String(value));
      });
    }

    return {
      headers,
      params,
      responseType: options?.responseType ?? 'json',
    };
  }

  // ─────────────────────────────────────────────
  // Manejo de errores
  // ─────────────────────────────────────────────
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error de red: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código ${error.status}: ${error.message}`;
    }

    console.error('[ApiService]', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}