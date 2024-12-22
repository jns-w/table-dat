import { IconProps } from "@/components/icons/icon.type"

export function Search(props: IconProps) {
  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <path
      stroke={color}
      strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" />
    <path stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
          d="M14.0001 14L11.1001 11.1" />
  </svg>
}