import { IconProps } from "@/components/icons/icon.type"


export function XCircle(props: IconProps) {
  const color = props.color || "currentColor"
  const size = props.size || 16
  const strokeWidth = props.strokeWidth || "1.17"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_82_75725)">
      <path
        stroke={color}
        strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}
        d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" />
      <path d="M10 6L6 10" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
      <path d="M6 6L10 10" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </g>
    <defs>
      <clipPath id="clip0_82_75725">
        <rect width={size} fill="white" height={size} />
      </clipPath>
    </defs>
  </svg>
}