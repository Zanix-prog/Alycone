import { motion } from 'framer-motion';

export const MotionDiv = (props: any) => (
  <motion.div
    {...props}
    className={`motion-safe ${props.className || ''}`}
  />
);
