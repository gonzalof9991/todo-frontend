import {Injectable} from '@angular/core';
import {ITask} from "../components/task/task.interface";
import {taskMock} from "../../mock/task";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public tasks: ITask[] = [];
  private _tasks$: Subject<ITask[]> = new Subject<ITask[]>();

  constructor() {
    if (localStorage.getItem('tasks')) {
      console.log('dentro')
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    }else{
      console.log('fuera')
      localStorage.setItem('tasks', JSON.stringify(taskMock));
      this.tasks = taskMock;
    }

  }

  get getTasks(): ITask[] {
    return this.tasks;
  }

  public getObservable(): Observable<ITask[]> {
    return this._tasks$.asObservable();
  }

  public createTask(task: ITask): void {
    if (this.validateTask(task)) {
      return;
    }
    this.tasks.push(task);
    this._tasks$.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  public validateTask(task: ITask): boolean {
    const findTask = this.tasks.find((t) => t.id === task.id);
    return !!findTask;
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
