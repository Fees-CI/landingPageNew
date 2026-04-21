type TrustBadgeProps = {
  className?: string;
};

export default function TrustBadge({ className }: TrustBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 text-sm font-semibold text-[#059669] ${className ?? ""}`.trim()}
    >
      <span aria-hidden="true">✅</span>
      <span>Certifie Naturalink</span>
    </div>
  );
}
