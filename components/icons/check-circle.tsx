import { IconProps } from "@/components/icons/icon.type"

export function CheckCircle(props: IconProps) {

  const color = props.color || "currentColor"
  const size = props.size || 16

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_48_21558)">
      <path
        stroke={color}
        strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" d="M7.99992 14.6668C11.6819 14.6668 14.6666 11.6822 14.6666 8.00016C14.6666 4.31816 11.6819 1.3335 7.99992 1.3335C4.31792 1.3335 1.33325 4.31816 1.33325 8.00016C1.33325 11.6822 4.31792 14.6668 7.99992 14.6668Z" />
      <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
            d="M6 7.99984L7.33333 9.33317L10 6.6665" />
    </g>
    <defs>
      <clipPath id="clip0_48_21558">
        <rect width={size} fill="white" height={size} />
      </clipPath>
    </defs>
  </svg>
}