'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useUser } from 'provider/userProvider';
import { CldImage } from 'next-cloudinary';
import avatar from 'public/images/avatar/emptyImage.png';

const imageLoader = ({ src }) => {
  return `${src}`;
};
const ProfileInfo = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const handleSignOut = () => {
    Cookies.remove('token');
    setOpen(false);
    window.location.href = '/auth/login';
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onClick={() => setOpen(!open)}
        asChild
        className=" cursor-pointer"
      >
        <div className="flex items-center">
          {user?.image ? (
            <CldImage
              loader={imageLoader}
              src={user.image}
              width="50"
              height="50"
              alt="avatar"
              className="rounded-full"
              priority
            />
          ) : (
            <Image
              src={avatar}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg w-56 p-0" align="end">
        <DropdownMenuItem
          onClick={() => setOpen(!open)}
          className="hover:text-primary dark:hover:bg-background !rounded-t-lg cursor-pointer"
        >
          <Link
            className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3"
            href="/user-profile"
          >
            {user?.image ? (
              <CldImage
                loader={imageLoader}
                src={user.image}
                width="36"
                height="36"
                alt="avatar"
                className="rounded-full"
                priority
              />
            ) : (
              <Image
                src={avatar}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
                priority
              />
            )}
            <div>
              <div className="text-sm font-medium text-default-800 capitalize">
                {user?.name ?? 'foulen'} {user?.username ?? 'ben foulen'}
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="rounded-b-lg flex items-center gap-2 text-sm font-medium text-default-600 capitalize  px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileInfo;
