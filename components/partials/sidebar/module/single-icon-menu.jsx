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
const SingleIconMenu = ({ item, locationName }) => {
  const { title, iconName, href } = item;
  const [key, setKey] = useState(0); // To force re-render on show

  const { ref } = useInView({
    threshold: 0.001, // Trigger when 50% of the element is visible
    onChange: (inView) => {
      if (inView) {
        // Update the key to force re-render
        setKey((prevKey) => prevKey + 1);
      }
    },
  });
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {href && iconName ? (
              <Link
                ref={ref}
                href={href}
                className="flex flex-col items-center justify-center cursor-pointer relative"
              >
                <Icon
                  key={key}
                  icon={iconName}
                  width={40}
                  className={cn('rounded-md transition-all duration-3000 p-2', {
                    'bg-primary  text-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]':
                      locationName === href,
                    'text-primary hover:bg-primary hover:text-white hover:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]':
                      locationName !== href,
                  })}
                />
              </Link>
            ) : iconName ? (
              <div
                ref={ref}
                className="flex flex-col items-center justify-center cursor-pointer relative"
              >
                <Icon
                  key={key}
                  icon={iconName}
                  width={40}
                  className={cn('rounded-md transition-all duration-3000 p-2', {
                    'bg-primary  text-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]':
                      locationName === href,
                    'text-primary hover:bg-primary hover:text-white hover:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]':
                      locationName !== href,
                  })}
                />
              </div>
            ) : (
              <button className="h-12 w-12 mx-auto rounded-md transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative text-default-500 dark:text-default-400 data-[state=delayed-open]:bg-primary/10  data-[state=delayed-open]:text-primary "></button>
            )}
          </TooltipTrigger>
          <TooltipContent side="right" className="capitalize">
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SingleIconMenu;
