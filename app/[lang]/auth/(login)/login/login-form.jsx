'use client';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { signInUser } from 'config/user.config';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Checkbox } from 'components/ui/checkbox';
import { useMediaQuery } from 'hooks/use-media-query';
import FacebookLoginButton from 'components/SocialAuth/facebookButton';
import GoogleLoginButton from 'components/SocialAuth/googleButton';
import { Dancing_Script } from 'next/font/google';
import clsx from 'clsx';
import { HastenLogo } from 'components/svg';
import Cookies from 'js-cookie';

// Configure the font
const dancingScript = Dancing_Script({
  subsets: ['vietnamese'], // Define the subsets you need
  weight: ['400', '700'], // Optionally specify weights
});

const schema = z.object({
  email: z.string().email({ message: 'Your email is invalid.' }),
  password: z.string().min(4),
});
const LogInForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = React.useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');
    }
  };
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
    setIsLoading(true);
    startTransition(async () => {
      try {
        const r = await signInUser('email', data);
        const { token } = r;
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(r.user));
        toast.success('Login Successful');
        setIsLoading(false);
        window.location.assign('/home');
        reset();
      } catch (error) {
        toast.error('Login info incorrect!');
        setIsLoading(false);
        console.error(error);
      }
    });
  };

  return (
    <div className="w-full h-full">
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
        Welcome
      </div>
      <div
        className={clsx(
          dancingScript.className,
          '2xl:text-lg text-base text-default-600 mt-2 leading-6',
        )}
      >
        Please sign in to your account
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 2xl:mt-7">
        <div className="relative">
          <Input
            removeWrapper
            type="email"
            id="email"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isLoading || isPending}
            {...register('email')}
            className={cn('peer', {
              'border-destructive': errors.email,
            })}
          />
          <Label
            htmlFor="email"
            className={clsx(
              dancingScript.className,
              'rounded-md absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            Email
          </Label>
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}
        <div className="relative mt-6">
          <Input
            removeWrapper
            type={passwordType === 'password' ? 'password' : 'text'}
            id="password"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isLoading || isPending}
            {...register('password')}
            className={cn('peer', {
              'border-destructive': errors.password,
            })}
          />
          <Label
            htmlFor="password"
            className={cn(
              dancingScript.className,
              'rounded-md absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
              {
                ' text-sm ': isDesktop2xl,
              },
            )}
          >
            Password
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === 'password' ? (
              <Icon icon="heroicons:eye" className="w-4 h-4 text-default-400" />
            ) : (
              <Icon
                icon="heroicons:eye-slash"
                className="w-4 h-4 text-default-400"
              />
            )}
          </div>
        </div>

        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-6 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className={clsx(
                dancingScript.className,
                'text-sm text-default-600 cursor-pointer whitespace-nowrap',
              )}
            >
              Remember me
            </Label>
          </div>
          <Link
            href={'/en/auth/forgot'}
            className={clsx(
              dancingScript.className,
              'flex-none text-sm text-primary',
            )}
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          className={clsx(dancingScript.className, 'w-full')}
          disabled={isLoading || isPending}
          size={!isDesktop2xl ? 'lg' : 'md'}
        >
          {(isLoading || isPending) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isLoading || isPending ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <GoogleLoginButton
          disabled={isLoading || isPending}
        ></GoogleLoginButton>
        <FacebookLoginButton
          disabled={isLoading || isPending}
        ></FacebookLoginButton>
      </div>
      <div
        className={clsx(
          dancingScript.className,
          'mt-6 text-center text-base text-default-600',
        )}
      >
        Don't have an account?{' '}
        <Link
          href={'/en/auth/register'}
          className={clsx(dancingScript.className, 'text-primary')}
        >
          {' '}
          Sign Up{' '}
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
