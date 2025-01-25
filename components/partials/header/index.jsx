'use client';
import React from 'react';
import { cn } from 'lib/utils';
import { useSidebar, useThemeStore } from 'store';
import ProfileInfo from './profile-info';
import VerticalHeader from './vertical-header';
import NotificationMessage from './notification-message';
import ClassicHeader from './layout/classic-header';

const Header = ({ handleOpenSearch }) => {
  const { navbarType } = useThemeStore();
  const { collapsed } = useSidebar();
  return (
    <ClassicHeader
      className={cn('mb-4', {
        'ltr:xl:ml-[300px]': !collapsed,
        'ltr:xl:ml-[72px]': collapsed,

        'sticky top-0': navbarType === 'sticky',
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader handleOpenSearch={handleOpenSearch} />
          <div className="nav-tools flex items-center  gap-2">
            <NotificationMessage />
            <div className="ltr:pl-2 rtl:pr-2">
              <ProfileInfo />
            </div>
          </div>
        </div>
      </div>
    </ClassicHeader>
  );
};

export default Header;
