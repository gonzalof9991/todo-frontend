// create Shared module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- import RouterModule
import { HttpClientModule } from '@angular/common/http'; // <-- import HttpClientModule
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PipeModule} from "./pipes/pipe.module";
import {MatButtonModule} from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from "@angular/material/tooltip";
@NgModule({
  imports: [

  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule, // <-- and here
    HttpClientModule, // <-- and here
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    PipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
