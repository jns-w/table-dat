import { IconProps } from "@/components/icons/icon.type"

export function ChevronsUp(props: IconProps) {
  const size = props.size ? props.size : 16
  const color = props.color ? props.color : "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
          d="M11.3332 7.33333L7.99984 4L4.6665 7.33333" />
    <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
          d="M11.3332 12L7.99984 8.66663L4.6665 12" />
  </svg>
}