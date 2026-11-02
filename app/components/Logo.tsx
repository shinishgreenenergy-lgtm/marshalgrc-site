/** Shield with three stacked control bars. Used in the header, the footer
 *  and at the centre of the control lattice, so it lives in one place. */
export function Shield({ size = 30, color = "currentColor" }: { size?: number; color?: string }) {
  const h = (size / 30) * 36;
  return (
    <svg width={size} height={h} viewBox="0 0 30 36" aria-hidden="true" focusable="false">
      <path
        d="M15 1.5 L28 6 V17 C28 25.5 22.5 31.5 15 34.5 C7.5 31.5 2 25.5 2 17 V6 Z"
        fill="none" stroke={color} strokeWidth="2"
      />
      <rect x="8.5" y="12" width="13" height="3" rx="1.5" fill={color} />
      <rect x="8.5" y="17" width="13" height="3" rx="1.5" fill={color} opacity=".75" />
      <rect x="8.5" y="22" width="13" height="3" rx="1.5" fill={color} opacity=".5" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="brand-word">
      Marshal<span>GRC</span>
    </span>
  );
}
