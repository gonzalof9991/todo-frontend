import {ITask} from "../shared/components/task/task.interface";


const tasks: ITask[] = [
  {
    id: 1,
    title: 'Learn React',
    description: 'Learn how to use React with TypeScript',
    estimate: 60,
    type: 'todo',
    status: 'active',
    priority: 'low',
    completed: false,
    categories: [
      {
        id: 1,
        name: 'React',
        classes: 'bg-blue-500'
      }, {
        id: 2,
        name: 'TypeScript',
        classes: 'bg-green-500'
      }
    ]
  },
  {
    id: 2,
    title: 'Learn Vue',
    description: 'Learn how to use Vue with TypeScript',
    estimate: 60,
    type: 'todo',
    status: 'active',
    priority: 'medium',
    completed: false,
    categories: [
      {
        id: 1,
        name: 'Vue',
        classes: 'bg-green-500'
      }, {
        id: 2,
        name: 'TypeScript',
        classes: 'bg-green-500'

      }
    ]
  },
  {
    id: 3,
    title: 'Learn Angular',
    description: 'Learn how to use Angular with TypeScript',
    estimate: 60,
    type: 'doing',
    status: 'active',
    completed: false,
    priority: 'high',
    categories: [
      {
        id: 1,
        name: 'Angular',
        classes: 'bg-red-500'
      }, {
        id: 2,
        name: 'TypeScript',
        classes: 'bg-green-500'
      }
    ]
  },
  {
    id: 4,
    title: 'Learn Svelte',
    description: 'Learn how to use Svelte with TypeScript',
    estimate: 60,
    type: 'done',
    status: 'active',
    completed: true,
    priority: 'low',
    categories: [
      {
        id: 1,
        name: 'Svelte',
        classes: 'bg-purple-500'
      }
    ]
  }
]

export default tasks
