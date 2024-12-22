export type BurgerMenuAnimationSets = "open" | "switch"

/**
 * Animations are propagated in the top level div of the burger menu
 * child components receives variant selection from parent automatically,
 * animation sets are switched through a state variable just before animation occurs
 *
 * there are 3 branches of animation sets:
 * 1. open - controls opening and closing of burger menu
 * 2. switch - controls switching between menus lists
 * */

const openTransition = {
  delayChildren: .25,
  duration: 0.3,
  ease: "easeOut",
  staggerChildren: .03,
}

const switchTransition = {
  duration: 0.4,
  opacity: {
    duration: 0.3,
    type: "linear",
  },
  staggerChildren: 0.02,
  type: "spring",
}


export const burgerWrapper = {
  openAnimate: {
    height: "fit-content",
    opacity: 1,
    transition: {
      height: {
        duration: .5,
        type: "spring",
      },
      opacity: {
        duration: 0.2,
        type: "linear",
      },
    },
  },
  openExit: {
    height: 65,
    opacity: .6,
    transition: {
      height: {
        delay: 0.15,
        duration: .30,
        ease: [.58, .61, .48, .98],
      },
      opacity: {
        delay: 0.4,
        duration: 0.1,
      },
    },
  },
  openInitial: {
    height: 65,
    opacity: .6,
    transition: {
      height: {
        delay: 0.15,
        duration: .30,
        ease: [.58, .61, .48, .98],
      },
      opacity: {
        delay: 0.4,
        duration: 0.1,
      },
    },
  },
}

export const burgerMenuList = {
  openAnimate: {
    opacity: 1,
    transition: {
      ...openTransition,
    },
  },
  openExit: {
    opacity: 0,
    transition: {
      ...openTransition,
      delayChildren: 0,
      staggerDirection: -1,
    },
  },
  openInitial: {
    transition: {
      ...openTransition,
    },
  },
  switchAnimate: {
    opacity: 1,
    transition: {
      ...switchTransition,
    },
  },
  switchExit: {
    opacity: 0,
    transition: {
      ...switchTransition,
    },
  },
  switchInitial: {
    opacity: 0,
    transition: {
      ...switchTransition,
    },
  },
}

export const burgerMenuItem = {
  openAnimate: {
    opacity: 1,
    transition: {
      ...openTransition,
    },
    x: 0,
  },
  openExit: {
    opacity: 0,
    transition: {
      ...openTransition,
    },
    x: 0,
  },
  openInitial: {
    opacity: 0,
    transition: {
      ...openTransition,
    },
    x: 0,
  },
  switchAnimate: {
    opacity: 1,
    transition: {
      ...switchTransition,
      staggerDirection: -1,
    },
    x: 0,
  },
  switchExit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
    x: -70,
  },
  switchInitial: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
    x: -70,
  },
}

export const burgerMenu2List = {
  openAnimate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
    x: 0,
  },
  openExit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
    x: 0,
  },
  openInitial: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
    x: 0,
  },
  switchAnimate: {
    opacity: 1,
    transition: {
      ...switchTransition,
    },
    x: 0,
  },
  switchExit: {
    opacity: 0,
    transition: {
      ...switchTransition,
      staggerDirection: -1,
    },
    x: 70,
  },
  switchInitial: {
    opacity: 0,
    transition: {
      ...switchTransition,
    },
    x: 70,
  },
}

export const burgerMenu2Item = {
  openAnimate: {
    opacity: 1,
    transition: {
      ...openTransition,
    },
    x: 0,
  },
  openExit: {
    opacity: 0,
    transition: {
      ...openTransition,
    },
    x: 0,
  },
  openInitial: {
    opacity: 0,
    transition: {
      ...openTransition,
    },
    x: 0,
  },
  switchAnimate: {
    opacity: 1,
    transition: {
      ...switchTransition,
    },
    x: 0,
  },
  switchExit: {
    opacity: 0,
    transition: {
      ...switchTransition,
    },
    x: -70,
  },
  switchInitial: {
    opacity: 0,
    transition: {
      ...switchTransition,
    },
    x: 70,
  },
}

export const burgerMenuSubList = {
  openAnimate: {
    transition: {
      delay: 0,
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: .01,
    },
  },
  openExit: {
    transition: {
      delay: 0,
      duration: 0.2,
      staggerChildren: .01,
      staggerDirection: -1,
    },
  },
  openInitial: {
    transition: {
      duration: 0.1,
    },
  },
}

export const burgerMenuSubItem = {
  openAnimate: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "easeOut",
    },
  },
  openExit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  openInitial: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}