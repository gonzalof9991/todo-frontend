import {Component, Input, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IContent} from "./content.interface";
import {PipeModule} from "../../pipes/pipe.module";
import {TaskComponent} from "../task/task.component";
import {ITask} from "../task/task.interface";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, PipeModule, TaskComponent, MatBadgeModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent {
  @Input() tasks!: ITask[];
  @Input() title!: string;
  @Input() type!: 'todo' | 'doing' | 'done';

}
