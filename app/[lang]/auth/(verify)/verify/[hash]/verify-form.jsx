'use client';
import toast from 'react-hot-toast';
import { confirmEmail } from 'config/user.config';
import { useRouter } from 'next/navigation';
import React, { startTransition, useEffect } from 'react';
import hastenLogo from 'public/images/hasten-logo.png';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import clsx from 'clsx';
import { HastenLogo } from 'components/svg';
import { Button } from 'components/ui/button';

// Configure the font
const dancingScript = Dancing_Script({
  subsets: ['vietnamese'], // Define the subsets you need
  weight: ['400', '700'], // Optionally specify weights
});

const VerifyForm = ({ hash }) => {
  const router = useRouter();

  useEffect(() => {
    function confirm() {
      startTransition(async () => {
        try {
          await confirmEmail(hash);
          toast.success('Email Confirmation successful');
          router.push('/auth/login');
        } catch (error) {
          console.log('Error Confirming Email', error);
          toast.error('An error occurred while confirming your Email.');
        }
      });
    }
    confirm();
  }, []);
  return (
    <div className="w-full md:w-[480px] py-5">
      <div className="justify-items-center">
        <Button
          asChild
          variant="outline"
          className="inline-block py-3 bg-white hover:bg-white border-transparent hover:border-transparent text-primary hover:text-primary w-80"
        >
          <HastenLogo className="text-primary h-40" />
        </Button>
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900"></div>
      </div>
      <div
        className={clsx(
          dancingScript.className,
          '2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900',
        )}
      >
        Welcome On Board!
      </div>
      <div
        className={clsx(
          dancingScript.className,
          '2xl:text-lg text-base text-default-600 mt-2 leading-6',
        )}
      >
        Your Email Has Been Verified
      </div>
      <form className="mt-8">
        <div className="flex flex-wrap  gap-1 lg:gap-6"></div>
        <div className="mt-6"></div>
      </form>
    </div>
  );
};

export default VerifyForm;
