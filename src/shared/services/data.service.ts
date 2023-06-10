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
    this.tasks = taskMock;
  }

  get getTasks(): ITask[] {
    return this.tasks;
  }

  public getObservable(): Observable<ITask[]> {
    return this._tasks$.asObservable();
  }

  public changeTask(task: ITask): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.verifyTask(task)
      this.tasks[index] = task;
      this._tasks$.next(this.tasks);
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
