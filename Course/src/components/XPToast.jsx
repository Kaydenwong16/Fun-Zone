import { useProgress } from "../context/ProgressContext.jsx";

export default function XPToast() {
  const { toast } = useProgress();
  if (!toast) return null;
  return (
    <div className="xp-toast-wrap" aria-live="polite">
      <span className="xp-toast" key={toast.key}>
        +{toast.xp} XP
      </span>
    </div>
  );
}
