import { IconProps } from "@/components/icons/icon.type"

export function ChevronLast(props: IconProps) {
  const size = props.size ? props.size : 16
  const color = props.color ? props.color : "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
          d="M4.6665 12L8.6665 8L4.6665 4" />
    <path stroke={color} d="M11.3335 4V12" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}