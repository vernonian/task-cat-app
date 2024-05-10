import type {DaysType} from "$lib/types/DaysType";
import type {TodoTaskCategoriesType} from "$lib/types/TodoTaskCategoriesType";

export interface TodoTask {
  id:number,
  name:string,
  completed:boolean,
  tag: 'default' | 'urgent' | 'optional' | 'ambitious' | 'unplanned',
  repeatsWeekly:boolean,
  timesPerWeek?:number,
  category:TodoTaskCategoriesType,
  dayTarget?: DaysType,
}

export type TodoTaskType = TodoTask;