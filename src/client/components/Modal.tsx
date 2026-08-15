import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { closeModal } from "../redux/modalSlice";
import { LuX, LuGamepad2 } from "react-icons/lu";

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen, header, content, isDismissible } = useSelector(
    (state: RootState) => state.modal,
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      aria-modal="true"
      role="dialog"
      onClick={() => {
        if (isDismissible !== false) {
          dispatch(closeModal());
        }
      }}
    >
      <div
        className="glass-card rounded-2xl p-6 sm:p-8 min-w-[300px] max-w-md w-full border border-amber-500/30 bg-slate-950/90 shadow-2xl relative overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {isDismissible !== false && (
          <button
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => dispatch(closeModal())}
            aria-label="Close modal"
          >
            <LuX className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <LuGamepad2 className="w-6 h-6 animate-pulse" />
          </div>
          {header && (
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
              {header}
            </h3>
          )}
        </div>

        {content && (
          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
            {content}
          </p>
        )}

        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            onClick={() => dispatch(closeModal())}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
