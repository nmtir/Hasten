'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'hooks/use-media-query';
import { forgotUser } from 'config/user.config';
import hastenLogo from 'public/images/hasten-logo.png';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import clsx from 'clsx';
import { HastenLogo } from 'components/svg';

// Configure the font
const dancingScript = Dancing_Script({
  subsets: ['vietnamese'], // Define the subsets you need
  weight: ['400', '700'], // Optionally specify weights
});

const schema = z.object({
  email: z.string().email({ message: 'Your email is invalid.' }),
});
const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        await forgotUser(data);
        toast.success('Password Reset code has been sent to your email');
        reset();
        router.push('/auth/login');
      } catch (error) {
        toast.error('error');
      }
    });
  };
  return (
    <div className="w-full">
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
        Forgot Your Password?
      </div>
      <div
        className={clsx(
          dancingScript.className,
          '2xl:text-lg text-base text-default-600 mt-2 leading-6',
        )}
      >
        Enter your email & instructions will be sent to you!
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div className="relative">
          <Input
            removeWrapper
            type="email"
            id="email"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isPending}
            {...register('email')}
            className={cn('peer', {
              'border-destructive': errors.email,
            })}
          />
          <Label
            htmlFor="email"
            className={clsx(
              dancingScript.className,
              'absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            Email
          </Label>
        </div>
        {errors.email && (
          <div
            className={clsx(dancingScript.className, 'text-destructive mt-2')}
          >
            {errors.email.message}
          </div>
        )}

        <Button
          className={clsx(dancingScript.className, 'w-full mt-6')}
          size={!isDesktop2xl ? 'lg' : 'md'}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'sending...' : 'Send Recovery Email'}
        </Button>
      </form>
      <div
        className={clsx(
          dancingScript.className,
          'mt-5 2xl:mt-8 text-center text-base text-default-600',
        )}
      >
        Forget it. Send me back to{' '}
        <Link
          href="/"
          className={clsx(dancingScript.className, 'text-primary')}
        >
          {' '}
          Sign In{' '}
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
