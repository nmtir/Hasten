'use client';
import React, { useEffect, useState } from 'react';
import Header from 'components/partials/header';
import Sidebar from 'components/partials/sidebar';
import { cn } from 'lib/utils';
import { useSidebar } from 'store';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import Footer from 'components/partials/footer';
import { useMediaQuery } from 'hooks/use-media-query';
import MobileSidebar from 'components/partials/sidebar/mobile-sidebar';
import HeaderSearch from 'components/header-search';
import { useMounted } from 'hooks/use-mounted';
import LayoutLoader from 'components/layout-loader';

const DashBoardLayoutProvider = ({ children, trans, user, categories }) => {
  const { collapsed } = useSidebar();
  const [open, setOpen] = useState(false);
  const location = usePathname();
  const isMobile = useMediaQuery('(min-width: 768px)');
  const mounted = useMounted();
  const [isReloading, setIsReloading] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = () => setIsReloading(true);

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (isReloading) {
    return <LayoutLoader />;
  }

  if (!mounted) {
    return <LayoutLoader />;
  }

  return (
    <>
      {/* Header Section */}
      <Header handleOpenSearch={() => setOpen(true)} trans={trans} />
      <Sidebar user={user} categories={categories} trans={trans} />

      {/* Content Section */}
      <div
        className={cn('content-wrapper transition-all duration-150 ', {
          'ltr:xl:ml-[300px]': !collapsed,
          'ltr:xl:ml-[72px]': collapsed,
        })}
      >
        <div className="md:pt-6 layout-padding pt-[15px] md:px-6 px-4 page-min-height">
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>

      {/* Footer Section */}
      <Footer handleOpenSearch={() => setOpen(true)} trans={trans} />
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({ children, setOpen, open, location }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
          pageExit: {
            opacity: 0,
          },
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 1,
        }}
      >
        <main>{children}</main>
      </motion.div>
      <MobileSidebar className="left-[300px]" />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
