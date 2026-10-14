import { ClipboardList } from "lucide-react";

function TasksEmptyComp() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
      <ClipboardList className="mb-3 size-12 text-muted" />
      <p className="font-semibold">تسکی یافت نشد</p>
      <p className="mt-1 text-sm text-muted">هنوز تسکی ثبت نشده یا فیلتری اعمال شده است</p>
    </div>
  );
}

export default TasksEmptyComp;
