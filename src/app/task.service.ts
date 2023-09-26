import { Injectable } from '@angular/core';
import { List } from './models/list';
import { Task } from './models/task';
import { WebService } from './web.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class TaskService {

  constructor(private webServices: WebService) { }

  getLists() {
    return this.webServices.get('lists');
  }

  createList(title: string) {
    return this.webServices.post('lists', { title });
  }
  
  getTasks(listId: string) {
    return this.webServices.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string) {
    return this.webServices.post(`lists/${listId}/tasks`, {title});
  }

  deleteList(listId: string) {
    return this.webServices.delete(`lists/${listId}`);
  } 

  deleteTask(listId: string, taskId: string) {
    return this.webServices.delete(`lists/${listId}/tasks/${taskId}`);
  }
  //patch(uri: string, payload: Object): Observable<Object>
  setCompleted(listId: string, task: Task) {
    return this.webServices.patch(`lists/${listId}/tasks/${task._id}`,{ completed : !task.completed })
  }
}

