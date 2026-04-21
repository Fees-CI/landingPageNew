type LoadingSpinnerProps = {
  label?: string;
  className?: string;
};

export default function LoadingSpinner({
  label,
  className,
}: LoadingSpinnerProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`.trim()}>
      <span
        aria-hidden="true"
        className="naturalink-spinner h-4 w-4 rounded-full border-2 border-[#00E5A0]/30 border-t-[#00E5A0]"
      />
      {label ? <span>{label}</span> : null}
    </span>
  );
}
