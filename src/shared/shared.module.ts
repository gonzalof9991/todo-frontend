// create Shared module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- import RouterModule
import { HttpClientModule } from '@angular/common/http'; // <-- import HttpClientModule
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  imports: [

  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule, // <-- and here
    HttpClientModule, // <-- and here
    MatIconModule
  ]
})
export class SharedModule { }
