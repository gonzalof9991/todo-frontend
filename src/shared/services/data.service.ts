import {Injectable} from '@angular/core';
import {ICategory, ITask} from "../components/task/task.interface";
import {categoryMock, taskMock} from "../../mock/mock";
import {Observable, Subject} from "rxjs";
export interface IOptionsValidate {
  array: string;
  comparator: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public tasks: ITask[] = [];
  public categories: ICategory[] = [];
  private _tasks$: Subject<ITask[]> = new Subject<ITask[]>();

  constructor() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    }else{
      localStorage.setItem('tasks', JSON.stringify(taskMock));
      this.tasks = taskMock;
    }

    if (localStorage.getItem('categories')) {
      this.categories = JSON.parse(localStorage.getItem('categories') || '{}');
    }else{
      localStorage.setItem('categories', JSON.stringify(categoryMock));
      this.categories = categoryMock;
    }

  }

  get getTasks(): ITask[] {
    return this.tasks;
  }

  get getCategories(): ICategory[] {
    return this.categories;
  }

  public getObservable(): Observable<ITask[]> {
    return this._tasks$.asObservable();
  }

  public createCategory(category: ICategory): void {
    if (this.validateItem(category, {array:'categories',comparator: 'id'})) {
      return;
    }
    this.categories.push(category);
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  public createTask(task: ITask): void {
    if (this.validateItem(task, {array:'tasks',comparator: 'id'})) {
      return;
    }
    this.tasks.push(task);
    this._tasks$.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  public deleteTask(task: ITask): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this._tasks$.next(this.tasks);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  public validateItem(item: any, options: IOptionsValidate): boolean {
    // @ts-ignore
    const findItem = this[options.array].find((t) => t[options.comparator] === item[options.comparator]);
    return !!findItem;
  }

  public changeTask(task: ITask): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.verifyTask(task)
      this.tasks[index] = task;
      this._tasks$.next(this.tasks);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  public verifyTask(task: ITask): void {
    if (task.type === 'done' || task.completed) {
      task.completed = true;
      task.type = 'done';
    }
    else if (task.type === 'todo') {
      task.completed = false;
    }
  }
}
