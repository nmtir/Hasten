import React from 'react';
import { cn, isLocationMatch, translate } from 'lib/utils';
import { Badge } from 'components/ui/badge';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useThemeStore } from 'store';

export function NavLink({ childItem, locationName }) {
  const { href, icon, title, badge } = childItem;
  return (
    <Link
      href={href}
      className={cn(
        'flex  font-medium  text-sm capitalize px-[10px] py-3 gap-3 rounded-md cursor-pointer',
        {
          'bg-primary text-primary-foreground': isLocationMatch(
            href,
            locationName,
          ),
          ' text-default-600': !isLocationMatch(href, locationName),
        },
      )}
    >
      {icon && <span className="inline-flex items-center   flex-grow-0"></span>}
      <div className="flex-grow truncate">{title}</div>
      {badge && <Badge className="rounded h-min ">{badge}</Badge>}
    </Link>
  );
}

const MenuItem = ({ childItem, locationName, trans }) => {
  const { title } = childItem;
  const { isRtl } = useThemeStore();
  return (
    <div>
      <div className=" flex-1">
        <NavLink
          childItem={childItem}
          locationName={locationName}
          trans={trans}
        />
      </div>
    </div>
  );
};

export default MenuItem;
