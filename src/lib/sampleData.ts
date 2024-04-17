import {type TodoTaskType} from '$lib/types/TodoTask';

const sampleData:TodoTaskType[] = [
  {
    id: 1,
    name: 'Groceries',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'household',
    dayTarget: 'monday'
  },
  { 
    id: 2,
    name: 'Laundry',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'household'
  },
  { 
    id: 3,
    name: 'Journal',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 2,
    tag: 'default',
    category: 'mind',
    dayTarget: 'sunday'
  },
  { 
    id: 4,
    name: 'Hang out with W',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'relationships',
  },
  { 
    id: 5,
    name: 'Hang out with X',
    repeatsWeekly: true,
    completed: false,
    timesPerWeek: 1,
    tag: 'default',
    category: 'relationships',
  },
  { 
    id: 6,
    name: 'Hang out with Y',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'relationships',
    dayTarget: 'tuesday'
  },
  { 
    id: 7,
    name: 'Hang out with Z',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'relationships',
    dayTarget: 'friday'
  },
]

export default sampleData;