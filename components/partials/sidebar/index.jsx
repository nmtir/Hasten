'use client';
import React from 'react';
import { useSidebar } from 'store';
import { useMediaQuery } from 'hooks/use-media-query';
import ModuleSidebar from './module';
import MobileSidebar from './mobile-sidebar';

const Sidebar = ({ user, categories, trans }) => {
  const { sidebarType } = useSidebar();
  let selectedSidebar;
  const sidebarComponents = {
    module: <ModuleSidebar user={user} categories={categories} trans={trans} />,
  };

  selectedSidebar = sidebarComponents[sidebarType] || (
    <ModuleSidebar user={user} categories={categories} />
  );

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
