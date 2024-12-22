export const tooltipMotionProps = {
  animate: "visible",
  exit: "hidden",
  initial: "hidden",
  transition: {
    duration: 0.1,
    scale: { duration: 0.1, type: "easeOut" },
    type: "linear",
  },
  variants: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  },
}

export const tooltipContentMotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        scale: { duration: 0.1, type: "easeIn" },
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05,
        opacity: { duration: 0.1, type: "linear" },
        scale: { duration: 0.15, type: "easeIn" },
      },
    },
  },
}