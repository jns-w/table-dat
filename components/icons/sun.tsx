import { IconProps } from "@/components/icons/icon.type"

export function Sun(props: IconProps) {
  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_24_87056)">
      <path
        stroke={color}
        strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
        d="M8.00016 10.6666C9.47292 10.6666 10.6668 9.47274 10.6668 7.99998C10.6668 6.52722 9.47292 5.33331 8.00016 5.33331C6.5274 5.33331 5.3335 6.52722 5.3335 7.99998C5.3335 9.47274 6.5274 10.6666 8.00016 10.6666Z" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" d="M8 1.33331V2.66665"
            strokeLinejoin="round" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" d="M8 13.3334V14.6667"
            strokeLinejoin="round" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
            d="M3.28662 3.28668L4.22662 4.22668" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
            d="M11.7734 11.7733L12.7134 12.7133" />
      <path stroke={color} strokeWidth="1.17" d="M1.3335 8H2.66683" strokeLinecap="round"
            strokeLinejoin="round" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" d="M13.3335 8H14.6668"
            strokeLinejoin="round" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
            d="M4.22662 11.7733L3.28662 12.7133" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
            d="M12.7134 3.28668L11.7734 4.22668" />
    </g>
    <defs>
      <clipPath id="clip0_24_87056">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
}