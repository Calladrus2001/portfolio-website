import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { closeModal } from "../redux/modalSlice";

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen, header, content, isDismissible } = useSelector(
    (state: RootState) => state.modal,
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-surface-elevated text-on-surface-inverse rounded-lg shadow-lg p-6 min-w-[280px] max-w-[90vw] max-h-[80vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {isDismissible !== false && (
          <button
            className="absolute top-2 right-2 text-xl text-on-surface-muted hover:text-on-surface-inverse-muted cursor-pointer"
            onClick={() => dispatch(closeModal())}
            aria-label="Close modal"
          >
            &times;
          </button>
        )}
        {header && <div className="text-xl font-bold mb-2">{header}</div>}
        {content && <div className="mb-2">{content}</div>}
      </div>
    </div>
  );
}
