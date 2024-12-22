import { IconProps } from "@/components/icons/icon.type"

export function LinkedIn(props: IconProps) {
  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" className={props.className}
              xmlns="http://www.w3.org/2000/svg">
    <mask x="0" y="0" width="16" height="16" id="mask0_38_26918" maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}>
      <mask x="0" y="0" width="16" height="16" id="mask1_38_26918" maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}>
        <path fill="white" d="M0 0H16V16H0V0Z" />
      </mask>
      <g mask="url(#mask1_38_26918)">
        <path
          fill="white"
          d="M14.816 0H1.18C0.528 0 0 0.516 0 1.153V14.843C0.00343032 15.153 0.129723 15.4489 0.351149 15.6658C0.572575 15.8827 0.871036 16.0029 1.181 16H14.816C15.469 16 16 15.481 16 14.847V1.153C16 0.516 15.469 0 14.816 0ZM4.746 13.634H2.373V5.997H4.748V13.634H4.746ZM3.56 4.956C3.37626 4.96122 3.19333 4.92956 3.02203 4.86291C2.85072 4.79626 2.6945 4.69596 2.5626 4.56793C2.4307 4.43991 2.32579 4.28676 2.25406 4.11751C2.18233 3.94827 2.14523 3.76637 2.14496 3.58255C2.1447 3.39874 2.18126 3.21673 2.2525 3.04728C2.32374 2.87783 2.42821 2.72437 2.55974 2.59596C2.69126 2.46756 2.84719 2.3668 3.0183 2.29965C3.18941 2.2325 3.37224 2.20032 3.556 2.205C3.91441 2.21413 4.2551 2.36279 4.50555 2.61933C4.75601 2.87587 4.89644 3.22003 4.89696 3.57855C4.89748 3.93708 4.75805 4.28165 4.50834 4.53891C4.25864 4.79618 3.91838 4.94583 3.56 4.956ZM13.635 13.634H11.263V9.922C11.263 9.037 11.248 7.897 10.029 7.897C8.795 7.897 8.607 8.863 8.607 9.859V13.634H6.239V5.997H8.513V7.041H8.545C8.86 6.441 9.635 5.806 10.788 5.806C13.192 5.806 13.635 7.388 13.635 9.444V13.634Z" />
      </g>
    </mask>
    <g mask="url(#mask0_38_26918)">
      <rect width={size} fill={color} height={size} />
    </g>
  </svg>

}