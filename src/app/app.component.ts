import {Component, OnInit} from '@angular/core';
import {ITask} from "../shared/components/task/task.interface";
import { HttpClient } from '@angular/common/http';
import {taskMock} from "../mock/task";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public tasks: ITask[] = [];

  constructor(
    private _http: HttpClient
  ) {

  }

  ngOnInit() {
    this.tasks = taskMock;
  }
}
