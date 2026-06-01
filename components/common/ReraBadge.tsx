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
        "inline-flex flex-col gap-0.5 sm:gap-1.5 max-w-[200px] sm:max-w-none sm:min-w-[168px]",
        "rounded-lg sm:rounded-xl border px-2 py-1.5 sm:px-4 sm:py-3",
        "border-[rgba(212,170,80,0.28)] sm:border-[rgba(212,170,80,0.32)]",
        "bg-[rgba(10,10,24,0.92)] backdrop-blur-md",
        elevated ? "shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:shadow-[0_8px_32px_rgba(0,0,0,0.45)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <BadgeCheck
          className="text-[#f0c84a] shrink-0 w-3 h-3 sm:w-4 sm:h-4"
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-[8px] sm:text-xs font-semibold text-[#f5e080] uppercase tracking-[0.04em] sm:tracking-[0.06em] leading-none">
          {RERA_APPROVAL_LABEL}
        </span>
      </div>
      <p className="text-[8px] sm:text-[11px] leading-tight pl-[16px] sm:pl-[24px]">
        <span className="text-[#7888a8]">Reg. </span>
        <span className="font-mono text-[#e8d890] tabular-nums tracking-tight sm:tracking-normal">
          {RERA_APPROVAL_NUMBER}
        </span>
      </p>
    </div>
  );
}
