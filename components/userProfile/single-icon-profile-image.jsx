import React, { useState } from 'react';
import { cn } from 'lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useInView } from 'react-intersection-observer';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
const SingleIconProfileImage = (image, message, icon, className) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon className={className} icon={icon} />
          </TooltipTrigger>
          <TooltipContent side="right" className="capitalize">
            {message}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SingleIconProfileImage;
