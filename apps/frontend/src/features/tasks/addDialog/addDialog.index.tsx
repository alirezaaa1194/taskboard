// import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { AddTaskDialogProps } from "./addDialog.type";
// import DropdownComp from "../../../utilities/components/dropdown/dropdown.index";

// function AddTaskDialogComp({ open, setOpen }: AddTaskDialogProps) {
//   const [status, setStatus] = useState("انجام نشده");
//   const [priority, setPriority] = useState("متوسط");

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog onClose={setOpen} className="relative z-50">
//         <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
//           <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
//         </Transition.Child>

//         <div className="fixed inset-0 grid place-items-end sm:place-items-center sm:p-4">
//           <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
//             <DialogPanel className="w-full rounded-t-2xl border border-border bg-surface p-4 sm:max-w-lg sm:rounded-lg">
//               <DialogTitle className="mb-3 font-bold">تسک جدید</DialogTitle>
//               <div className="space-y-3">
//                 <input className="field" placeholder="عنوان تسک" readOnly />
//                 <div className="grid grid-cols-2 gap-3">
//                   <DropdownComp value={status} onChange={setStatus} options={["انجام نشده", "در حال انجام", "انجام شده"]} />
//                   <DropdownComp value={priority} onChange={setPriority} options={["پایین", "متوسط", "بالا"]} />
//                 </div>
//                 <textarea className="field" rows={4} placeholder="توضیحات" readOnly />
//               </div>
//               <div className="mt-4 flex gap-2">
//                 <button onClick={() => setOpen(false)} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover">
//                   ذخیره
//                 </button>
//                 <button onClick={() => setOpen(false)} className="rounded-md px-4 py-2.5 text-sm text-muted transition hover:bg-border/50">
//                   انصراف
//                 </button>
//               </div>
//             </DialogPanel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

// export default AddTaskDialogComp;

"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AddTaskDialogProps } from "./addDialog.type";
import DropdownComp from "../../../utilities/components/dropdown/dropdown.index";
import TiptapEditorComp from "./tiptapEditor/tiptapEditor.index";

const STATUS_OPTIONS = ["انجام نشده", "در حال انجام", "انجام شده"];
const PRIORITY_OPTIONS = ["پایین", "متوسط", "بالا"];
const ASSIGNEE_OPTIONS = ["رضا کریمی", "سارا محمدی", "مریم احمدی", "بدون مسئول"];

function AddTaskDialogComp({ open, setOpen }: AddTaskDialogProps) {
  const [status, setStatus] = useState("انجام نشده");
  const [priority, setPriority] = useState("متوسط");
  const [assignee, setAssignee] = useState("بدون مسئول");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState<object | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={setOpen} className="relative z-50">
        <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 grid place-items-end sm:place-items-center sm:p-4">
          <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-4 sm:max-w-lg sm:rounded-lg">
              <DialogTitle className="mb-3 font-bold">تسک جدید</DialogTitle>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-muted">عنوان</label>
                  <input className="field" placeholder="عنوان تسک" readOnly />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-muted">وضعیت</label>
                    <DropdownComp value={status} onChange={setStatus} options={STATUS_OPTIONS} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">اولویت</label>
                    <DropdownComp value={priority} onChange={setPriority} options={PRIORITY_OPTIONS} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-muted">مسئول</label>
                    <DropdownComp value={assignee} onChange={setAssignee} options={ASSIGNEE_OPTIONS} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">تاریخ سررسید</label>
                    <input type="date" className="field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-muted">توضیحات</label>
                  <TiptapEditorComp content={description} onChange={setDescription} />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={handleClose} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover">
                  ذخیره
                </button>
                <button onClick={handleClose} className="rounded-md px-4 py-2.5 text-sm text-muted transition hover:bg-border/50">
                  انصراف
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AddTaskDialogComp;
