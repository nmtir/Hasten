'use client';
import React from 'react';
import { useMounted } from 'hooks/use-mounted';
import LayoutLoader from 'components/layout-loader';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

const AuthProvider = ({ children }) => {
  const mounted = useMounted();
  const location = usePathname();
  if (!mounted) {
    return <LayoutLoader />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0.5, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.5, scale: 0.9 }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          transformOrigin: 'center',
        }}
      >
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthProvider;
