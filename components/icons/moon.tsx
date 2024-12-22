import type { IconProps } from "@/components/icons/icon.type"

export function Moon(props: IconProps) {
  const size = props.size || 16
  const color = props.color || "currentColor"

  return <svg fill="none" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path
      stroke={color}
      strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"
      d="M8 2C7.20895 2.79661 6.76588 3.87427 6.76784 4.99693C6.76981 6.11958 7.21665 7.19568 8.01048 7.98952C8.80432 8.78336 9.88043 9.2302 11.0031 9.23216C12.1257 9.23413 13.2034 8.79105 14 8C14 9.18669 13.6481 10.3467 12.9888 11.3334C12.3295 12.3201 11.3925 13.0892 10.2961 13.5433C9.19975 13.9974 7.99335 14.1162 6.82946 13.8847C5.66558 13.6532 4.59648 13.0818 3.75736 12.2426C2.91825 11.4035 2.3468 10.3344 2.11529 9.17054C1.88378 8.00666 2.0026 6.80026 2.45673 5.7039C2.91085 4.60754 3.67989 3.67047 4.66658 3.01118C5.65328 2.35189 6.81331 2 8 2Z" />
  </svg>
}