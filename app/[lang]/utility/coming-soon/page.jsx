'use client';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { HastenLogo } from 'components/svg';
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiGoogle,
} from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import Link from 'next/link';
import LightImage from 'public/images/utility/coming-soon.png';
import { Dancing_Script } from 'next/font/google';
import clsx from 'clsx';
import React from 'react';

// Configure the font
const dancingScript = Dancing_Script({
  subsets: ['vietnamese'], // Define the subsets you need
  weight: ['400', '700'], // Optionally specify weights
});
const ComingSoonPage = () => {
  const socials = [
    {
      link: '/',
      icon: <SiX />,
    },
    {
      link: '/',
      icon: <SiFacebook />,
    },
    {
      link: '/',
      icon: <SiInstagram />,
    },
    {
      link: '/',
      icon: <SiGoogle />,
    },
  ];
  const menu = [
    {
      label: 'FAQ',
      link: '/',
    },
    {
      label: 'Email Us',
      link: '/',
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}

      {/* main */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="container ">
          <div className="flex-none p-10 flex flex-wrap justify-between gap-4 ">
            <Button
              asChild
              className="bg-white text-primary hover:text-white hover:bg-primary  inset-hover  rounded-xl  h-[100px] w-[200px] items-center flex justify-center"
            >
              <HastenLogo className="text-primary h-20 " />
            </Button>
            <Button
              className="w-[150px] bg-white text-primary hover:text-white hover:bg-primary inset-hover h-[100px]"
              asChild
              size="lg"
            >
              <Link
                className={clsx(dancingScript.className, 'text-2xl')}
                href="/dashboard"
              >
                Contact Us
              </Link>
            </Button>
          </div>
          <div className="px-10 inset-no-hover py-10 bg-white rounded-xl flex flex-col lg:flex-row  justify-between items-center gap-5 ">
            <div className="w-[570px]  lg:max-w-[570px]">
              <div
                className={clsx(
                  dancingScript.className,
                  'text-2xl font-medium text-default-900',
                )}
              >
                Coming soon!
              </div>
              <div
                className={clsx(
                  dancingScript.className,
                  'mt-4 text-5xl 2xl:text-7xl font-semibold text-default-900',
                )}
              >
                Get notified
              </div>
              <div className=" relative mt-5 lg:mt-12">
                <Input
                  type="text"
                  placeholder="Enter your email"
                  className={clsx(
                    dancingScript.className,
                    'h-12 lg:h-16 placeholder:text-base',
                  )}
                />
                <Button
                  className={clsx(
                    dancingScript.className,
                    'absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 h-8 lg:h-11',
                  )}
                >
                  Notify me
                </Button>
              </div>
              <div
                className={clsx(
                  dancingScript.className,
                  'mt-4 text-sm text-default-500',
                )}
              >
                *Don’t worry we will not spam you :)
              </div>
            </div>

            <div className="mt-10 lg:mt-0 xl:pl-32">
              <Image
                src={LightImage}
                alt="coming soon"
                className="h-[400px] object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex-none flex flex-col sm:flex-row  flex-wrap gap-4 p-10">
            <div className="flex flex-wrap items-center gap-4 flex-1 ">
              {socials.map((item, index) => (
                <Button
                  key={`social-icon-${index}`}
                  size="icon"
                  className="rounded-full inset-hover bg-white text-primary hover:text-white hover:bg-primary"
                  asChild
                >
                  <Link href={item.link}> {item.icon} </Link>
                </Button>
              ))}
            </div>
            <ul className="flex-none  flex flex-wrap gap-6">
              {menu.map((item, index) => (
                <li key={`nav-item-${index}`}>
                  <Link
                    href={item.link}
                    className={clsx(
                      dancingScript.className,
                      'p-3 rounded-lg inset-hover text-2xl bg-white text-primary hover:text-white hover:bg-primary',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
