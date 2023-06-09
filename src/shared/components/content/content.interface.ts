import {ITask} from "../task/task.interface";

export interface IContent{
    title: string;
    type: 'todo' | 'doing' | 'done';
    tasks: ITask[];
}

