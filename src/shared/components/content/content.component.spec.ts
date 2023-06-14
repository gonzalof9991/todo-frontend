import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared.module";
import {AppModule} from "../../../app/app.module";
import {taskMock} from "../../../mock/task";
import {MatDialog} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {DataService} from "../../services/data.service";
import {ContentComponent} from "./content.component";


const mocks = taskMock;


describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let dialog: MatDialog;
  let dataService: DataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContentComponent,
        HttpClientTestingModule,
        AppModule,
        SharedModule
      ],
      providers: [
        {
          provide: DataService,
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    component.tasks = mocks;
    dialog = TestBed.inject(MatDialog);
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  })

  it('You should call the dialog.', () => {
    spyOn(component, 'openDialog').and.callFake(() => {
      return {
        afterClosed: () => {
          of(taskMock[0])
        }
      }
    })
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  })

  it('You should call the dialog and createTask.', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.callFake(() => {
      return {
        beforeClosed(): Observable<any>{
          const task = {
            ...mocks[0],
            id: 16,
            title: 'test',
            description: 'test',
            type: 'todo'
          }
          return of({
            event: 'save',
            data: task
          })
        }
      }
    })
    spyOn(component, 'createTask').and.callThrough();
    spyOn(dataService, 'createTask').and.callThrough();
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.createTask).toHaveBeenCalled();
    expect(dataService.createTask).toHaveBeenCalled();
  });
});

