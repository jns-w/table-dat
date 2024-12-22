import { IconProps } from "@/components/icons/icon.type"

export function ChevronRight(props: IconProps) {
  const size = props.size ? props.size : 16
  const color = props.color ? props.color : "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} d="M6 12L10 8L6 4" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}