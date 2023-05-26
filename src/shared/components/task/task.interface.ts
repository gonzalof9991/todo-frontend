export interface ITask{
    id: number;
    title: string;
    description: string;
    estimate: number;
    type: string;
    status: string;
    priority: string;
    completed: boolean;
    categories: ICategory[];
}
export interface ICategory{
    id: number;
    name: string;
    classes: string;
}
