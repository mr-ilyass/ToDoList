import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  findTask(): Observable<Task[]>{ return this.http.get<Task[]>(this.apiUrl).pipe(
    tap(data => console.log('all: ' + JSON.stringify(data))) ); }
  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  persist(task) {
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }
  // tslint:disable-next-line:typedef
  completed(id, completed){
    return this.http.patch(`${this.apiUrl}/${id}`, {completed: !completed});
  }
  update(task){
   return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

}
