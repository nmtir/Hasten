'use client';
import { startTransition, useState } from 'react';
import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { cn } from 'lib/utils';
import { Icon } from '@iconify/react';
import { Eye, EyeOff } from 'lucide-react';
import SaveConfirmationDialog from 'components/save-confirmation-dialog';
import { toast } from 'react-hot-toast';
import { updateUserAction } from 'config/user.config';
import { useUser } from 'provider/userProvider';
import Cookies from 'js-cookie';

const ChangePassword = () => {
  const [currentPasswordType, setCurrentPasswordType] = useState('password');
  const [newPasswordType, setNewPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const { updateUser } = useUser();
  const [currentPassword, setCurrentPassword] = useState('xxxxxxxx');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const token = Cookies.get('token');

  const requirements = [
    {
      text: 'Minimum 8 characters long - the more, the better.',
      validate: () => newPassword.length >= 8,
    },
    {
      text: 'At least one lowercase character.',
      validate: () => /[a-z]/.test(newPassword),
    },
    {
      text: 'At least one number, symbol, or whitespace character.',
      validate: () => /[\d\s\W]/.test(newPassword),
    },
  ];

  const reset = () => {
    setCurrentPassword('xxxxxxxx');
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleOpen = () => {
    if (currentPassword === 'xxxxxxxx') {
      toast.error('Please enter your current password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    const isValid = [
      newPassword.length >= 8, // At least 8 characters
      /[a-z]/.test(newPassword), // At least one lowercase character
      /[\d\s\W]/.test(newPassword), // At least one number, symbol, or whitespace
    ].every(Boolean);

    if (!isValid) {
      toast.error('New password does not meet the requirements.');
      return;
    }

    setOpen(true);
  };
  const handleSave = () => {
    let data = {
      email: undefined,
      oldPassword: currentPassword,
      password: newPassword,
    };
    startTransition(async () => {
      try {
        const r = await updateUserAction(data, token);
        const { token } = r;
        Cookies.set('token', token, { expires: 1 });
        console.log(r);
        updateUser();
        toast.success('Password updated successfully!');
        setOpen(false);
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      }
    });
  };

  return (
    <>
      <Card className="rounded-t-none pt-6">
        <CardContent>
          <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
            <div className="col-span-12 md:col-span-6">
              <Label
                htmlFor="currentPassword"
                className="mb-2 text-default-800"
              >
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={currentPasswordType}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Eye
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer',
                    currentPasswordType === 'text' && 'hidden',
                  )}
                  onClick={() => setCurrentPasswordType('text')}
                />
                <EyeOff
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer',
                    currentPasswordType === 'password' && 'hidden',
                  )}
                  onClick={() => setCurrentPasswordType('password')}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6"></div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="newPassword" className="mb-2 text-default-800">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={newPasswordType}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Eye
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer',
                    newPasswordType === 'text' && 'hidden',
                  )}
                  onClick={() => setNewPasswordType('text')}
                />
                <EyeOff
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer',
                    newPasswordType === 'password' && 'hidden',
                  )}
                  onClick={() => setNewPasswordType('password')}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label
                htmlFor="confirmPassword"
                className="mb-2 text-default-800"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={confirmPasswordType}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Eye
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer',
                    confirmPasswordType === 'text' && 'hidden',
                  )}
                  onClick={() => setConfirmPasswordType('text')}
                />
                <EyeOff
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer',
                    confirmPasswordType === 'password' && 'hidden',
                  )}
                  onClick={() => setConfirmPasswordType('password')}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 text-sm font-medium text-default-800">
            Password Requirements:
          </div>
          <div className="mt-3 space-y-1.5">
            {requirements.map((requirement, index) => {
              const isValid = requirement.validate();
              return (
                <div
                  className="flex items-center gap-1.5"
                  key={`requirement-${index}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isValid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <div
                    className={`text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {requirement.text}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-5 justify-end">
            <Button onClick={() => reset()} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleOpen}>
              <Icon
                icon="heroicons:lock-closed"
                className="w-5 h-5 text-primary-foreground me-1"
              />
              Change Password
            </Button>
          </div>
          <SaveConfirmationDialog
            question="Are you sure you want to change your password?"
            paragraph={null}
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={handleSave}
            defaultToast={false}
            toastMessage=""
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
