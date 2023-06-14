import {Component, OnInit} from '@angular/core';
import {ICategory, ITask} from "../shared/components/task/task.interface";
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
  public categories: ICategory[] = [];
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
    this.categories = this._dataService.getCategories;

  }
}
