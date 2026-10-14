import { Users } from "lucide-react";

function UsersEmptyComp() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
      <Users className="mb-3 size-12 text-muted" />
      <p className="font-semibold">کاربری یافت نشد</p>
      <p className="mt-1 text-sm text-muted">هنوز کاربری ثبت نشده یا فیلتری اعمال شده است</p>
    </div>
  );
}

export default UsersEmptyComp;
