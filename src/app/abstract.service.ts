import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractHttpService {
  protected baseUrl: string = 'http://localhost:8080/client'; // Substitua pelo seu URL base

  constructor(protected http: HttpClient) {}

  protected getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    // Pode adicionar headers aqui, se necessário
    return headers;
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro retornado pelo servidor
      console.error(
        `Código do erro ${error.status}, ` +
        `mensagem: ${error.error}`);
    }
    // Retorna um observable com uma mensagem de erro
    return throwError('Ocorreu um problema. Por favor, tente novamente mais tarde.');
  }

  protected get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  protected post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, data, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
  }