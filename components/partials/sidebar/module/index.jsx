import React, { useEffect, useState } from 'react';
import { cn, isLocationMatch, getDynamicPath, translate } from 'lib/utils';
import { menusConfig } from 'config/menus';
import SingleIconMenu from './single-icon-menu';
import { usePathname } from 'next/navigation';
import { useSidebar, useThemeStore } from 'store';
import Link from 'next/link';
import { SiteLogo } from 'components/svg';
import { ScrollArea } from 'components/ui/scroll-area';
import MenuOverlayPortal from './MenuOverlayPortal';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { Button } from '../../../ui/button';
import MenuItem, { NavLink } from './menu-item';
import LogoutFooter from './logout-footer';
import { ChevronLeft } from 'lucide-react';

const ModuleSidebar = ({ user, categories }) => {
  const menus = (menusConfig?.sidebarNav?.modern || []).map((menu) => {
    if (menu.title === 'Categories') {
      // Update the menu to include the child property
      return {
        ...menu,
        child: categories.map((category) => ({
          ...category,
          href: `/categories/${category.id}/task`, // Update href for each category
        })),
      };
    }
    return menu; // Return other menus unchanged
  });

  const { subMenu, setSubmenu, collapsed, setCollapsed } = useSidebar();
  const [menuOverlay, setMenuOverlay] = useState(false);
  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  const [currentSubMenu, setCurrentSubMenu] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(min-width: 768px)');

  const toggleSubMenu = (index) => {
    setActiveIndex(index);
    if (menus[index].child) {
      setCurrentSubMenu(menus[index].child);
      setSubmenu(false);
      setCollapsed(false);
      if (!isDesktop) {
        setMenuOverlay(true);
      }
    } else {
      setSubmenu(true);
      setCollapsed(true);
      if (!isDesktop) {
        if (isLocationMatch(menus[index].href, locationName)) {
          setSubmenu(false);
        }
      }
    }
  };
  function setActiveMenu(menuIndex, childMenu) {
    setActiveIndex(menuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
  }
  const getMenuTitle = () => {
    if (activeIndex !== null) {
      return menus[activeIndex].title;
    }
    return '';
  };
  useEffect(() => {
    let isMenuMatched = false;
    menus.forEach((item, i) => {
      if (isLocationMatch(item.title, locationName)) {
        isMenuMatched = true;
        setSubmenu(true);
        setCollapsed(true);
        setMenuOverlay(false);
      }

      item?.child?.forEach((childItem, j) => {
        if (isLocationMatch(childItem.href, locationName)) {
          setActiveMenu(i, item.child);
          setMenuOverlay(false);
          isMenuMatched = true;
        }
      });
    });
    if (!isMenuMatched) {
      setSubmenu(false);
    }
    if (!isDesktop) {
      setSubmenu(true);
    }
  }, [locationName, isDesktop]);

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  return (
    <>
      <div className="main-sidebar  pointer-events-none fixed start-0 top-0 z-[60] flex h-full xl:z-10 print:hidden">
        <div
          className={cn(
            'border-default-200  dark:border-default-300 pointer-events-auto relative z-20 flex h-full w-[72px] flex-col border-r border-dashed   bg-card transition-all duration-300',
            {
              'ltr:-translate-x-full ltr:xl:translate-x-0  ':
                !collapsed && subMenu,
              'translate-x-0': collapsed,
            },
          )}
        >
          <div className="bg-secondary text-primary hover:bg-primary hover:text-secondary transition-all duration-3000 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] hover:shadow-[inset_0_5px_10px_0_rgba(0,0,0,0.3)] pt-4 pb-4 ">
            <Link href="/dashboard">
              <SiteLogo
                style={{ width: '43px', height: '42px' }}
                className=" mx-auto"
              />
            </Link>
          </div>
          {/* end logo */}
          <ScrollArea className=" pt-6 grow shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] ">
            {menus.map((item, i) => (
              <div
                key={i}
                onClick={() => toggleSubMenu(i)}
                className=" mb-3 last:mb-0"
              >
                <SingleIconMenu item={item} locationName={locationName} />
              </div>
            ))}
          </ScrollArea>
        </div>
        <div
          className={cn(
            'border-default-200 pointer-events-auto relative z-10 flex flex-col h-full w-[228px] border-none  bg-card   transition-all duration-300',
            {
              'rtl:translate-x-[calc(100%_+_72px)] translate-x-[calc(-100%_-_72px)]':
                collapsed || subMenu,
            },
          )}
        >
          <h2 className="text-lg  bg-transparent   z-50   font-semibold  flex gap-4 items-center   text-default-700 sticky top-0 py-4  px-4   capitalize ">
            <span className=" block ">{getMenuTitle()}</span>
            {!isDesktop && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setCollapsed(true);
                  setSubmenu(true);
                  setMenuOverlay(false);
                }}
                className="rounded-full h-8 w-8"
              >
                <ChevronLeft className="w-5 h-5  " />
              </Button>
            )}
          </h2>
          <ScrollArea className="h-[calc(100%-40px)]  grow ">
            <div className="px-4 " dir={'ltr'}>
              <ul>
                {currentSubMenu?.map((childItem, j) => (
                  <li key={j} className="mb-1.5 last:mb-0">
                    <div>
                      <div className=" flex-1">
                        <NavLink
                          childItem={childItem}
                          locationName={locationName}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
          <LogoutFooter />
        </div>
        {/* end main panel */}
      </div>

      {!isDesktop && (
        <MenuOverlayPortal
          isOpen={menuOverlay || collapsed}
          onClose={() => {
            setMenuOverlay(false);
            setSubmenu(true);
            setCollapsed(false);
          }}
        />
      )}
    </>
  );
};

export default ModuleSidebar;
