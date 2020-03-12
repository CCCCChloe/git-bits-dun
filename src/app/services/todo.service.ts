import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  dataUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.dataUrl);
  }
}
