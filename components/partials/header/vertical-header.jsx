import React from 'react';
import { useSidebar, useThemeStore } from 'store';
import { cn } from 'lib/utils';
import { Search } from 'lucide-react';
import { SiteLogo } from 'components/svg';
import Link from 'next/link';
import { useMediaQuery } from 'hooks/use-media-query';

const MenuBar = ({ collapsed, setCollapsed }) => {
  return (
    <button
      className="relative group  disabled:cursor-not-allowed opacity-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            'flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden',
            {
              '-translate-x-1.5 rotate-180': !collapsed,
            },
          )}
        >
          <div
            className={cn(
              'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
              {
                'rotate-[42deg] w-[11px]': !collapsed,
                'w-7': collapsed,
              },
            )}
          ></div>
          <div
            className={cn(
              'bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300',
              {
                'translate-x-10': !collapsed,
              },
            )}
          ></div>
          <div
            className={cn(
              'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
              {
                '-rotate-[43deg] w-[11px]': !collapsed,
                'w-7': collapsed,
              },
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

const VerticalHeader = ({ handleOpenSearch }) => {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <>
      <div className="flex items-center md:gap-6 gap-3">
        <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div>
          <button
            className=" inline-flex  gap-2 items-center text-default-600 text-sm"
            onClick={handleOpenSearch}
          >
            <span>
              <Search className=" h-4 w-4" />
            </span>
            <span className=" md:block hidden"> Search...</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default VerticalHeader;
