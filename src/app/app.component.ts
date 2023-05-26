import {Component, OnInit} from '@angular/core';
import tasks from "../mock/task";
import {ITask} from "../shared/components/task/task.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public tasks: ITask[] = [];

  constructor() {

  }

  ngOnInit() {
    this.tasks = tasks
    console.log(this.tasks)
  }
}
