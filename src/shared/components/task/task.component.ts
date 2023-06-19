import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ITask} from "./task.interface";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {DialogModule} from "../dialog/dialog.module";
// @ts-ignore
import {DataService} from "../../services/data.service";

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCheckboxModule, FormsModule, MatButtonModule, DialogModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
  ]
})
export class TaskComponent {
  @Input() task!: ITask;
  public showButton: boolean = false;
  constructor(
    public dialog: MatDialog,
    private _dataService: DataService
  ) {
  }

  public completeTask(): void {
    const newType = (this.task.completed) ? 'done': 'doing';
    this.changeType(newType);
  }

  public change(type: 'leave' | 'enter'): void{
    if (this.task.type !== 'todo') {
      return;
    }
    this.showButton = type === 'enter';
  }

  public goToTask(): void {
    this.changeType('doing');
    this.showButton = false;
  }

  public changeType(type: 'todo' | 'doing' | 'done'): void {
    this.task.type = type;
    this._dataService.changeTask(this.task);
  }

  public openDialog(): void {
    const task = {...this.task};
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        title: 'Edit Task',
        task,
        options: {
          buttons: {
            cancel: 'Cerrar',
            save: 'Guardar'
          }
        }
      },
      disableClose: true,
      autoFocus: false,
      panelClass: ['c-dialog', 'c-dialog--xs-full-screen']
    });

    dialogRef.beforeClosed().subscribe(res => {
      if (res.event === 'delete'){
        this.deleteTask(this.task);
        return;
      }
      if (res.data) {
        this.task = res.data;
        this._dataService.changeTask(this.task);
      }
    });

    }

  public deleteTask(task: ITask): void {
    this._dataService.deleteTask(task);
  }


}
