import { IconProps } from "@/components/icons/icon.type"

export function Clock4(props: IconProps) {

  const color = props.color || "currentColor"
  const size = props.size || 16
  const strokeWidth = props.strokeWidth || "1.17"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_82_72521)">
      <path
        stroke={color}
        strokeLinecap="round" strokeLinejoin="round" strokeWidth={props.strokeWidth}
        d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6819 14.6668 7.99998C14.6668 4.31808 11.6821 1.33331 8.00016 1.33331C4.31826 1.33331 1.3335 4.31808 1.3335 7.99998C1.3335 11.6819 4.31826 14.6666 8.00016 14.6666Z" />
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M8 4V8L10.6667 9.33333"
            strokeWidth={props.strokeWidth} />
    </g>
    <defs>
      <clipPath id="clip0_82_72521">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
}