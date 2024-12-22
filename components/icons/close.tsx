import { IconProps } from "@/components/icons/icon.type"

export function Close(props: IconProps) {

  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12" stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4L12 12" stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}