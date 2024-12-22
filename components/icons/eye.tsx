import { IconProps } from "@/components/icons/icon.type"

export function Eye(props: IconProps) {
  const size = props.size ? props.size : 16
  const color = props.color ? props.color : "currentColor"
  const strokeWidth = props.strokeWidth ? props.strokeWidth : "1.17"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <path
      stroke={color}
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}
      d="M1.3335 8.00001C1.3335 8.00001 3.3335 3.33334 8.00016 3.33334C12.6668 3.33334 14.6668 8.00001 14.6668 8.00001C14.6668 8.00001 12.6668 12.6667 8.00016 12.6667C3.3335 12.6667 1.3335 8.00001 1.3335 8.00001Z" />
    <path
      stroke={color}
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}
      d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" />
  </svg>

}