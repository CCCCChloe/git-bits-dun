import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  dataUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getTodos() {
    console.log(this.http.get(this.dataUrl));
    return this.http.get(this.dataUrl);
  }
}
