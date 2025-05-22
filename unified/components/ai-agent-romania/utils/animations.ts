import { Variants } from 'framer-motion';

// Widget animations
export const widgetVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1
    }
  }
};

// Message animations
export const messageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};

// Button animations
export const buttonVariants: Variants = {
  idle: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeOut'
    }
  }
};

// Glow animations
export const glowVariants: Variants = {
  idle: {
    opacity: 0.4,
    scale: 1
  },
  active: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// Typing indicator animation
export const typingVariants: Variants = {
  start: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
  end: {
    opacity: 1
  }
};

export const dotVariants: Variants = {
  start: {
    y: 0,
    opacity: 0.4
  },
  end: {
    y: [-3, 0, -3],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// Slide animations for actions
export const actionSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Spring animations config
export const springConfig = {
  type: 'spring',
  stiffness: 260,
  damping: 20
};

// Custom easing functions
export const customEasing = {
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275]
};