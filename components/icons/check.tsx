import { IconProps } from "@/components/icons/icon.type"

export function Check(props: IconProps) {

  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
          d="M13.3332 4L5.99984 11.3333L2.6665 8" />
  </svg>

}