import {type TodoTaskType} from '$lib/types/TodoTask';

const sampleData:TodoTaskType[] = [
  {
    id: 1,
    name: 'Groceries',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'errands',
  },
  { 
    id: 2,
    name: 'Laundry',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'errands'
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
    name: 'Hang out with Will',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
  },
  { 
    id: 5,
    name: 'Virtual game night with TTTC',
    repeatsWeekly: true,
    completed: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
    dayTarget: 'monday'
  },
  { 
    id: 6,
    name: 'Coffee with Henrietta',
    completed: false,
    repeatsWeekly: false,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
    dayTarget: 'saturday'
  },
  { 
    id: 7,
    name: 'Dinner with Jane',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
    dayTarget: 'tuesday'
  },
  {
    id: 8,
    name: 'Yoga',
    completed: true,
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
    name: 'Climb with the squad',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'body',
    dayTarget: 'tuesday'
  },
  {
    id: 11,
    name: 'Gym',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 2,
    tag: 'default',
    category: 'body',
    dayTarget: 'thursday'
  },
  { 
    id: 12,
    name: 'Marie\'s baby shower',
    completed: false,
    repeatsWeekly: false,
    timesPerWeek: 1,
    tag: 'default',
    category: 'social',
    dayTarget: 'saturday'
  },
  { 
    id: 13,
    name: 'Play video games',
    completed: false,
    repeatsWeekly: false,
    timesPerWeek: 1,
    tag: 'default',
    category: 'hobbies',
  },
  { 
    id: 14,
    name: 'Cook',
    completed: false,
    repeatsWeekly: true,
    timesPerWeek: 4,
    tag: 'default',
    category: 'hobbies',
  },
  { 
    id: 15,
    name: 'Read',
    completed: true,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'hobbies',
  },
  { 
    id: 16,
    name: 'Meditate',
    completed: true,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'mind',
  },
  { 
    id: 16,
    name: 'Sweep floors',
    completed: true,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'errands',
  },
  { 
    id: 17,
    name: 'Clean bathroom',
    completed: true,
    repeatsWeekly: true,
    timesPerWeek: 1,
    tag: 'default',
    category: 'mind',
  },
  { 
    id: 18,
    name: 'Drop of ballot',
    completed: true,
    repeatsWeekly: false,
    timesPerWeek: 1,
    tag: 'default',
    category: 'errands',
  },
]

export default sampleData;