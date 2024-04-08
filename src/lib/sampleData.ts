import {type TodoTaskType} from '$lib/types/TodoTask';

const sampleData:TodoTaskType[] = [
  {
    id: 1,
    name: 'Groceries',
    repeatsWeekly: true,
    timesPerWeek: 1,
    completed: true,
    tag: 'default',
    category: 'household',
    dayTarget: 'monday'
  },
  { 
    id: 2,
    name: 'Laundry',
    repeatsWeekly: true,
    timesPerWeek: 1,
    completed: false,
    tag: 'default',
    category: 'household'
  },
  { 
    id: 3,
    name: 'Journal',
    repeatsWeekly: true,
    timesPerWeek: 2,
    completed: false,
    tag: 'default',
    category: 'mind'
  },
  { 
    id: 4,
    name: 'Hang out with X',
    repeatsWeekly: true,
    timesPerWeek: 1,
    completed: false,
    tag: 'default',
    category: 'relationships'
  },
]

export default sampleData;