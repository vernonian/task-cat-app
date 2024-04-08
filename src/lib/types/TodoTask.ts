

export interface TodoTask {
  id:number,
  name:string,
  completed:boolean,
  tag: 'default' | 'urgent' | 'optional' | 'ambitious' | 'unplanned',
  repeatsWeekly:boolean,
  timesPerWeek?:number,
  category: 'household' | 'body' | 'mind' | 'spirit' | 'relationships' | 'misc',
  dayTarget?: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday',
}

export type TodoTaskType = TodoTask;