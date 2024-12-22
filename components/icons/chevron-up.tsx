import { IconProps } from "@/components/icons/icon.type"

export function ChevronUp(props: IconProps) {
  const size = props.size ? props.size : 16
  const color = props.color ? props.color : "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} strokeWidth="1.17" d="M12 10L8 6L4 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

}