// app/en/auth/create-password/[hash]/create-password-form.jsx

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
import { useRouter } from 'next/navigation'; // Correct import for app directory
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Checkbox } from 'components/ui/checkbox';
import { useMediaQuery } from 'hooks/use-media-query';
import { resetUserPass } from 'config/user.config';
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
// Define validation schema using Zod
const schema = z.object({
  password: z
    .string()
    .min(4, { message: 'Your password must be at least 4 characters.' }),
  confirmPassword: z
    .string()
    .min(4, { message: 'Your password must be at least 4 characters.' }),
});

const CreatePasswordForm = ({ hash }) => {
  const router = useRouter(); // Define router
  const [isPending, startTransition] = React.useTransition();
  const [newPasswordType, setNewPasswordType] = React.useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = React.useState(false);
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
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
    // Ensure hash is present
    if (!hash) {
      toast.error('Invalid password reset link.');
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    startTransition(async () => {
      try {
        await resetUserPass(data.password, hash);
        toast.success('Password reset successful');
        reset();
        router.push('/auth/login');
      } catch (error) {
        console.log(error);
        toast.error('An error occurred while resetting your password.');
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
          '2xl:mt-8 mt-6 2xl:text-3xl lg:text-2xl text-xl font-bold text-default-900',
        )}
      >
        Create New Password
      </div>
      <div
        className={clsx(
          dancingScript.className,
          '2xl:text-lg text-base text-default-600 mt-2 leading-6',
        )}
      >
        Enter your password to unlock the screen!
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="2xl:mt-7 mt-8">
        {/* New Password Field */}
        <div className="relative mt-4">
          <Input
            removeWrapper
            type={newPasswordType ? 'text' : 'password'}
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
              'absolute text-base text-default-600 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            New Password
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={() => setNewPasswordType(!newPasswordType)}
          >
            {newPasswordType ? (
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

        {/* Confirm Password Field */}
        <div className="relative mt-4">
          <Input
            removeWrapper
            type={confirmPasswordType ? 'text' : 'password'}
            id="confirmPassword"
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=" "
            disabled={isPending}
            {...register('confirmPassword')}
            className={cn('peer', {
              'border-destructive': errors.confirmPassword,
            })}
          />
          <Label
            htmlFor="confirmPassword"
            className={clsx(
              dancingScript.className,
              'absolute text-base text-default-600 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
            )}
          >
            Confirm Password
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={() => setConfirmPasswordType(!confirmPasswordType)}
          >
            {confirmPasswordType ? (
              <Icon icon="heroicons:eye" className="w-5 h-5 text-default-400" />
            ) : (
              <Icon
                icon="heroicons:eye-slash"
                className="w-5 h-5 text-default-400"
              />
            )}
          </div>
        </div>
        {errors.confirmPassword && (
          <div
            className={clsx(dancingScript.className, 'text-destructive mt-2')}
          >
            {errors.confirmPassword.message}
          </div>
        )}

        {/* Terms & Conditions Checkbox */}
        <div className="mt-5 flex items-center gap-1.5">
          <Checkbox
            size="sm"
            className="border-default-300 mt-[1px]"
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

        {/* Submit Button */}
        <Button
          className={clsx(dancingScript.className, 'w-full mt-8')}
          size={!isDesktop2xl ? 'lg' : 'md'}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>

      {/* Link to Sign In */}
      <div
        className={clsx(
          dancingScript.className,
          'mt-6 text-center text-base text-default-600',
        )}
      >
        Not now? Return{' '}
        <Link
          href="/en/auth/login"
          className={clsx(dancingScript.className, 'text-primary')}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
