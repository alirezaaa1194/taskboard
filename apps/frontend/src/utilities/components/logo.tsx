export function Logo({ className = "size-9" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-[10px] bg-primary text-white ${className}`}>
      <svg viewBox="0 0 24 24" className="size-[58%]" fill="none" aria-hidden>
        <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
