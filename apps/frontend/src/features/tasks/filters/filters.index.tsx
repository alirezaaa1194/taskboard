import { useState } from "react";
import DropdownComp from "@/utilities/components/dropdown/dropdown.index";

const STATUS_FILTERS = ["همه وضعیت‌ها", "انجام نشده", "در حال انجام", "انجام شده"];
const ASSIGNEE_FILTERS = ["همه افراد", "رضا کریمی", "سارا محمدی", "مریم احمدی"];

function TasksPageFilterComp() {
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS[0]);
  const [assigneeFilter, setAssigneeFilter] = useState(ASSIGNEE_FILTERS[0]);
  return (
    <div className="mb-4 flex gap-2">
      <DropdownComp value={statusFilter} onChange={setStatusFilter} options={STATUS_FILTERS} rounded />
      <DropdownComp value={assigneeFilter} onChange={setAssigneeFilter} options={ASSIGNEE_FILTERS} rounded />
    </div>
  );
}

export default TasksPageFilterComp;
