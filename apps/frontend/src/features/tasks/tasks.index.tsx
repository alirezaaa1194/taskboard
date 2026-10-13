"use client";
import TasksPageHeaderComp from "./header/header.index";
import TasksPageFilterComp from "./filters/filters.index";
import TasksListComp from "./list/list.index";
import AddTaskDialogComp from "./addDialog/addDialog.index";
import { useState } from "react";

export default function TasksPageComp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <TasksPageHeaderComp setOpen={setOpen} />

      {/* Filters */}
      <TasksPageFilterComp />

      {/* Task grid */}
      <TasksListComp />

      {/* Dialog */}
      <AddTaskDialogComp open={open} setOpen={setOpen} />
    </>
  );
}
