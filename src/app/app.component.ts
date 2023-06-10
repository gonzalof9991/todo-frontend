import {Component, OnInit} from '@angular/core';
import {ITask} from "../shared/components/task/task.interface";
import { HttpClient } from '@angular/common/http';
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public tasks: ITask[] = [];

  constructor(
    private _http: HttpClient,
    private _dataService: DataService
  ) {

  }

  ngOnInit() {
    this.tasks = this._dataService.getTasks;
    this._dataService.getObservable().subscribe((tasks) => {
      this.tasks = tasks;
    });

  }
}
