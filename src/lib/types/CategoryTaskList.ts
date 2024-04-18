import type { TodoTaskType } from "$lib/types/TodoTask";

export interface CategoryTaskList {
  categoryId:number,
  categoryName:string,
  categoryTasks:TodoTaskType[]
}

export type CategoryTaskListType = CategoryTaskList;