import { IconProps } from "@/components/icons/icon.type"

export function X(props: IconProps) {
  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <mask x="0" y="0" width="16" height="16" id="mask0_38_26915" maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}>
      <rect width="16" height="16" fill={color} />
    </mask>
    <g mask="url(#mask0_38_26915)">
      <path
        fill={color}
        d="M12.551 1.00098H14.8L9.887 6.61598L15.667 14.258H11.141L7.596 9.62298L3.54 14.258H1.29L6.545 8.25098L1 1.00098H5.64L8.845 5.23698L12.551 1.00098ZM11.761 12.911H13.008L4.963 2.27598H3.626L11.763 12.911H11.761Z" />
    </g>
  </svg>
}