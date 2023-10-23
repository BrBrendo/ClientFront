import { Injectable } from "@angular/core";
import { AbstractHttpService } from "../abstract.service";
import { HttpHeaders } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PublishService extends AbstractHttpService{
 

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    uploadFileName(fileNames: string[]): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/uploadFileName?fileNames=${fileNames}`, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }

   
}