import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  myTask: Task = {
    label: '',
    completed: false
  };
  searchText: '';
  showForm = false;
  editform = false ;
  tasks: Task[] = [];
  resultTasks: Task[] = [];


  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.findTask().subscribe({
      next: tasks => {
        this.tasks = tasks, this.resultTasks = tasks;
      }
    });
  }

  deleteTask(id){
    this.taskService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }
  persistTask(){
    this.taskService.persist(this.myTask).subscribe((task) => this.tasks = [task, ...this.tasks ]);
    this.resetTask();
  }
  resetTask(){
    this.myTask = {
      label: '',
      completed: false
    };
  }

  toggleCompleted(task){
    this.taskService.completed(task.id, task.completed).subscribe(() => {
      task.completed = !task.complted
    } );
  }
  editTask(task){
    this.myTask = task ;
    this.editform = true ;
    this.showForm = true ;
  }
  updateTask(){
    this.taskService.update(this.myTask).subscribe(task => {
      this.resetTask();
      this.editform = false;
    } );
  }
  show(){
    this.showForm = true ;
  }
  searchTasks(){

    this.resultTasks = this.tasks.filter((task) => task.label.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));

  }



}
