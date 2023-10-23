import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, catchError } from "rxjs";
import { AbstractHttpService } from "../abstract.service";
import { Arquivo } from "../arquivo.model";




@Injectable({
    providedIn: 'root'
})
export class ReceiverService extends AbstractHttpService{
 

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }



    listFiles(): Observable<Arquivo[]> {
        return this.http.get<Arquivo[]>(`${this.baseUrl}/list`, { headers: this.getHeaders() })
        .pipe(
            catchError(this.handleError)
          );
          ;
      }

      downloadFile(fileName: string, ipAddress: string, port: number, startByte: number, chunkSize: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/download?fileName=${fileName}&ipAddress=${ipAddress}&port=${port}&startByte=${startByte}&chunkSize=${chunkSize}`, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
}