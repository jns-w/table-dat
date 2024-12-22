import { IconProps } from "@/components/icons/icon.type"

export function Copy(props: IconProps) {

  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_24_84514)">
      <path
        stroke={color}
        strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
        d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" />
      <path
        stroke={color}
        strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
        d="M3.3335 9.99998H2.66683C2.31321 9.99998 1.97407 9.8595 1.72402 9.60946C1.47397 9.35941 1.3335 9.02027 1.3335 8.66665V2.66665C1.3335 2.31302 1.47397 1.97389 1.72402 1.72384C1.97407 1.47379 2.31321 1.33331 2.66683 1.33331H8.66683C9.02045 1.33331 9.35959 1.47379 9.60964 1.72384C9.85969 1.97389 10.0002 2.31302 10.0002 2.66665V3.33331" />
    </g>
    <defs>
      <clipPath id="clip0_24_84514">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
}