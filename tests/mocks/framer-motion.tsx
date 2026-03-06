import React from "react";

const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) => {
      return React.forwardRef(
        (props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
          const {
            initial: _i,
            animate: _a,
            exit: _e,
            transition: _t,
            whileHover: _wh,
            whileTap: _wt,
            onHoverStart: _ohs,
            onHoverEnd: _ohe,
            layoutId: _l,
            variants: _v,
            ...rest
          } = props;
          return React.createElement(prop, { ...rest, ref });
        }
      );
    },
  }
);

const AnimatePresence = ({ children }: { children: React.ReactNode }) => children;

export { motion, AnimatePresence };
