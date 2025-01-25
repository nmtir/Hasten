'use client';
import React, { useState } from 'react';
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
import { registerUser, signInUser } from 'config/user.config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Checkbox } from 'components/ui/checkbox';
import { useMediaQuery } from 'hooks/use-media-query';
import FacebookButton from 'components/SocialAuth/facebookButton';
import GoogleLoginButton from 'components/SocialAuth/googleButton';
import hastenLogo from 'public/images/hasten-logo.png';
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
  lastName: z.string().min(3, { message: 'must be at least 3 characters.' }),
  firstName: z.string().min(3, { message: 'must be at least 3 characters.' }),
  email: z.string().email({ message: 'Your email is invalid.' }),
  password: z.string().min(4),
});
const RegForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');
    }
  };
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
        await registerUser(data);
        reset();
        const r = await signInUser('email', data);
        const { token } = r;
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(r.user));
        router.push('/home');
      } catch (error) {
        toast.error('Something Went Wrong');
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
        Welcome
      </div>

      <div
        className={clsx(
          dancingScript.className,
          '2xl:text-lg text-base text-default-600 mt-2 leading-6',
        )}
      >
        Create account to start
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="relative">
          <Input
            removeWrapper
            type="text"
            id="firstName"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isPending}
            {...register('firstName')}
            className={cn('peer', {
              'border-destructive': errors.firstName,
            })}
          />
          <Label
            htmlFor="firstName"
            className={clsx(
              dancingScript.className,
              'absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            First Name
          </Label>
        </div>
        {errors.firstName && (
          <div
            className={clsx(dancingScript.className, ' text-destructive mt-2')}
          >
            {errors.firstName.message}
          </div>
        )}

        <div className="relative mt-4">
          <Input
            removeWrapper
            type="text"
            id="lastName"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isPending}
            {...register('lastName')}
            className={cn('peer', {
              'border-destructive': errors.lastName,
            })}
          />
          <Label
            htmlFor="lastName"
            className={clsx(
              dancingScript.className,
              'absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            Last Name
          </Label>
        </div>
        {errors.lastName && (
          <div
            className={clsx(dancingScript.className, ' text-destructive mt-2')}
          >
            {errors.lastName.message}
          </div>
        )}

        <div className="relative mt-4">
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
              'absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            Email
          </Label>
        </div>
        {errors.email && (
          <div
            className={clsx(dancingScript.className, ' text-destructive mt-2')}
          >
            {errors.email.message}
          </div>
        )}
        <div className="relative mt-4">
          <Input
            removeWrapper
            type={passwordType}
            id="password"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isPending}
            {...register('password')}
            className={cn('peer', {
              'border-destructive': errors.password,
            })}
          />
          <Label
            htmlFor="password"
            className={clsx(
              dancingScript.className,
              'absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            Password
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === 'password' ? (
              <Icon icon="heroicons:eye" className="w-5 h-5 text-default-400" />
            ) : (
              <Icon
                icon="heroicons:eye-slash"
                className="w-5 h-5 text-default-400"
              />
            )}
          </div>
        </div>
        {errors.password && (
          <div
            className={clsx(dancingScript.className, 'text-destructive mt-2')}
          >
            {errors.password.message}
          </div>
        )}
        <div className="flex  items-center gap-1.5 my-5 ">
          <Checkbox
            size="sm"
            className={clsx(
              dancingScript.className,
              'border-default-300 mt-[1px]',
            )}
            id="terms"
          />
          <Label
            htmlFor="terms"
            className={clsx(
              dancingScript.className,
              'text-sm text-default-600 cursor-pointer whitespace-nowrap',
            )}
          >
            You accept our Terms & Conditions
          </Label>
        </div>
        <Button
          className={clsx(dancingScript.className, 'w-full')}
          disabled={isPending}
          size={!isDesktop2xl ? 'lg' : 'md'}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {isPending ? 'Registering...' : 'Create an Account'}
        </Button>
      </form>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <GoogleLoginButton disabled={isPending}></GoogleLoginButton>
        <FacebookButton disabled={isPending}></FacebookButton>
      </div>
      <div
        className={clsx(
          dancingScript.className,
          'mt-5 2xl:mt-8 text-center text-base text-default-600',
        )}
      >
        Already Registered?{' '}
        <Link href="/" className="text-primary">
          {' '}
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegForm;
