import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute, //tells the activated route.
    private router: Router        //if user clicks on a list it can redirect to that list
  ) { }
  listId: string = "";
  taskId: string = "";
  //when whole page will be loaded ng OnInit will execute.
  ngOnInit() {
    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
      // console.log("list hit")
    });

    //when ever the route changes this params will be called.
    this.route.params
    .subscribe((params: Params) => {
      this.listId = params['listId'];
      console.log(this.listId);
      
      //if this.listId is null return nothing.
      if (!this.listId) return;
      this.taskService.getTasks(this.listId).subscribe((tasks: any) => {
        this.tasks = tasks;
      });
    });
  }

/*
  Method 1
  --> in task-view.component.ts
  => userData$: Observable<any>; $ sign is an observable
  constructor(service declaration){
    this.userData$=this.userdataService.getUserData();
  --> in task-view.component.html
  =>data of userData relplace it to => data of userData$ | async
  -> this async pipe is used for fetching the data.
  }
*/

  onTaskClick(task: Task) {
    this.taskService.setCompleted(this.listId, task)
    .subscribe(() => task.completed = !task.completed)
  }


  deleteTask(task: Task) {
    task.completed === true;
    this.taskService.deleteTask(this.listId, task._id)
    .subscribe((task: any) =>
      this.tasks = this.tasks.filter((t: Task) => t._id !== task._id)
    ); 
  }
  

  deleteList(list: List) {
    this.taskService.deleteList(list._id)
    .subscribe(() => this.lists = this.lists.filter((l:List) => l._id !== list._id)
    )
  }

  addTask(){
    if(!this.listId){
      alert("select List!!");
    }
    this.router.navigate(['./new-task'], {relativeTo: this.route}); //relativeTo??
  }
  



}
  //Q1) how to set model as a datatype i am getting some error



