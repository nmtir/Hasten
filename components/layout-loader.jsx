'use client';
import React from 'react';
import { SiteLogo } from 'components/svg';
import { Loader2 } from 'lucide-react';

const LayoutLoader = () => {
  return (
    <div className="z-50 absolute bottom-1/2 left-1/2">
      <div className="relative bg-white rounded-full h-20 w-20">
        <Loader2 className="text-primary absolute h-20 w-20 animate-spin" />
        <div className="absolute h-20 w-20 flex items-center justify-center">
          <SiteLogo className="h-10 w-10 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default LayoutLoader;
