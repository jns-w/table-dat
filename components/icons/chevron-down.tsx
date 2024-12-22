import { IconProps } from "@/components/icons/icon.type"

export function ChevronDown(props: IconProps) {
  const size = props.size ? props.size : 16
  const color = props.color ? props.color : "currentColor"

  return <svg {...props.className && {className: props.className}} fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} d="M4 6L8 10L12 6" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}