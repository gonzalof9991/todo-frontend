import {Component, OnInit} from '@angular/core';
import {ITask} from "../shared/components/task/task.interface";
import { HttpClient } from '@angular/common/http';

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
    // get data from backend
    this._http.get('http://127.0.0.1:5000/tasks',{
      headers: {
        'Content-Type': 'application/json',
      }
    }).subscribe((data: any) => {
      console.log(data);
      this.tasks = data;
    });
    
  }
}
