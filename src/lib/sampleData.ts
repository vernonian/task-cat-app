import {type TodoTaskType} from '$lib/types/TodoTask';

const sampleData:TodoTaskType[] = [
  {
    id: 1,
    name: 'Groceries',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'house',
    dayTarget: 'monday'
  },
  { 
    id: 2,
    name: 'Laundry',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'house'
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
    category: 'social',
  },
  { 
    id: 5,
    name: 'Hang out with X',
    repeatsWeekly: true,
    completed: false,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
  },
  { 
    id: 6,
    name: 'Hang out with Y',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
    dayTarget: 'tuesday'
  },
  { 
    id: 7,
    name: 'Hang out with Z',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
    dayTarget: 'friday'
  },
  {
    id: 8,
    name: 'Yoga',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'body',
  },
  {
    id: 9,
    name: 'Walk',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'body',
  },
  {
    id: 10,
    name: 'Climb',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'body',
  },
  {
    id: 11,
    name: 'Climb',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'body',
  }
]

export default sampleData;