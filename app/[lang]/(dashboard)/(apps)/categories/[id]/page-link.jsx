'use client';
import React, { use } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from 'lib/utils';

const pages = [
  {
    text: 'overview',
    value: 'overview',
  },
  {
    text: 'task',
    value: 'task',
  },
];
const PageLink = ({ params }) => {
  const { id } = use(params);
  const locationName = usePathname();
  return pages.map((item) => (
    <Link
      key={item.value}
      href={`/categories/${id}/${item.value}`}
      className={cn(
        'mb-0 mt-0  font-semibold  capitalize p-3 pt-1 pb-1  border-transparent rounded-md bg-inherit hover:bg-primary-400 text-default-500 hover:text-white inset-hover-low cursor-pointer',
        {
          'border-primary': locationName === `/categories/${id}/${item.value}`,
        },
      )}
    >
      {item.value}
    </Link>
  ));
};

export default PageLink;
