import { Modal } from './Modal';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog = ({ open, title, message, confirmLabel, onConfirm, onClose }: ConfirmDialogProps) => (
  <Modal open={open} title={title} onClose={onClose}>
    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{message}</p>
    <div className="mt-6 flex justify-end gap-3">
      <button onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold dark:border-slate-700">
        Cancel
      </button>
      <button
        onClick={() => {
          onConfirm();
          onClose();
        }}
        className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);
