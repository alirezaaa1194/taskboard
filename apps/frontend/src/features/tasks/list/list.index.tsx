"use client";
import TasksItemComp from "./item/item.index";

function TasksListComp() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TasksItemComp />
    </div>
  );
}

export default TasksListComp;
