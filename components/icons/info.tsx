import type { IconProps } from "@/components/icons/icon.type"

export function Info(props: IconProps) {

  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_82_73895)">
      <path
        stroke={color}
        strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
        d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 7.99999C14.6668 4.3181 11.6821 1.33333 8.00016 1.33333C4.31826 1.33333 1.3335 4.3181 1.3335 7.99999C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" />
      <path stroke={color} d="M8 10.6667V8" strokeWidth="1.17" strokeLinecap="round"
            strokeLinejoin="round" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" d="M8 5.33333H8.00667"
            strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_82_73895">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>

}