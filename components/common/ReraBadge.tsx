import { BadgeCheck } from "lucide-react";
import { RERA_APPROVAL_LABEL, RERA_APPROVAL_NUMBER } from "@/lib/rera";

interface ReraBadgeProps {
  className?: string;
  /** Extra shadow for overlays (3D panel, etc.) */
  elevated?: boolean;
}

export function ReraBadge({ className = "", elevated = false }: ReraBadgeProps) {
  return (
    <div
      className={[
        "inline-flex flex-col gap-1.5 min-w-[168px] max-w-full",
        "rounded-xl border px-4 py-2.5 sm:px-4 sm:py-3",
        "border-[rgba(212,170,80,0.32)] bg-[rgba(10,10,24,0.92)] backdrop-blur-md",
        elevated ? "shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-2">
        <BadgeCheck size={16} className="text-[#f0c84a] shrink-0" strokeWidth={2} aria-hidden />
        <span className="text-[11px] sm:text-xs font-semibold text-[#f5e080] uppercase tracking-[0.06em] leading-none">
          {RERA_APPROVAL_LABEL}
        </span>
      </div>
      <p className="text-[10px] sm:text-[11px] leading-snug pl-[24px]">
        <span className="text-[#7888a8]">Reg. No. </span>
        <span className="font-mono text-[#e8d890] tabular-nums tracking-normal break-all sm:break-normal">
          {RERA_APPROVAL_NUMBER}
        </span>
      </p>
    </div>
  );
}
