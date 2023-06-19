import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IContent} from "./content.interface";
import {PipeModule} from "../../pipes/pipe.module";
import {TaskComponent} from "../task/task.component";
import {ICategory, ITask} from "../task/task.interface";
import {MatBadgeModule} from "@angular/material/badge";
import {SharedModule} from "../../shared.module";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent, IDialogData} from "../dialog/dialog.component";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, PipeModule, TaskComponent, MatBadgeModule, SharedModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent {
  @Input() tasks!: ITask[];
  @Input() categories!: ICategory[];
  @Input() title!: string;
  @Input() type!: 'todo' | 'doing' | 'done';

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService
  ) {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        title: 'Create Task', task: { type: 'todo'}, goingToCreate: true , options: {
          buttons: {
            cancel: 'Cerrar',
            save: 'Crear'
          }
        }
      },
      disableClose: true,
      panelClass: ['c-dialog', 'c-dialog--xs-full-screen']
    });
    dialogRef.beforeClosed().subscribe((result: { event: 'cancel' | 'save' | 'delete', data: ITask }) => {
      if (result.event === 'cancel') {
        return;
      }
      this.createTask(result.data);
    });
  }



  public createTask(task: ITask): void {
    const newId = this.tasks.length + 1;
    task.id = newId;
    this._dataService.createTask(task);
  }

}
