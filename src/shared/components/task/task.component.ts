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
  @Output() public changeTask: any;
  public showButton: boolean = false;
  constructor(
    private _dialog: MatDialog
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
  }

  public openDialog(): void {
    const task = {...this.task};
    const dialogRef = this._dialog.open(DialogComponent, {
      width: '900px',
      data: task
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.data) {
        this.task = res.data;
      }
    
    });

    }


}
