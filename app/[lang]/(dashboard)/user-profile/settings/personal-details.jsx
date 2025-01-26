'use client';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { Label } from 'components/ui/label';
import { Button } from 'components/ui/button';
import { startTransition, useState } from 'react';
import { Card, CardContent } from 'components/ui/card';
import SaveConfirmationDialog from 'components/save-confirmation-dialog';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { updateUserAction } from 'config/user.config';
import { useUser } from 'provider/userProvider';

const PersonalDetails = () => {
  const { user, updateUser } = useUser();
  const [firstName, setFirstName] = useState(user.name);
  const [lastName, setLastName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);
  const [open, setOpen] = useState(false);
  const token = Cookies.get('token');
  const reset = () => {
    setFirstName(user.name);
    setLastName(user.username);
    setEmail(user.email);
    setAbout(user.about);
  };
  const handleSave = () => {
    if (email !== user.email) {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        about: about,
      };
      startTransition(async () => {
        try {
          const r = await updateUserAction(data, token);
          const { token: newToken } = r;
          Cookies.set('token', newToken, { expires: 1 });
          updateUser();
          toast.success(
            'Profile updated successfully! check your new email for verification!',
          );
          setOpen(false);
        } catch (error) {
          toast.error('Something Went Wrong');
        }
      });
    } else {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: undefined,
        about: about,
      };
      startTransition(async () => {
        try {
          const r = await updateUserAction(data, token);
          const { token: newToken } = r;
          Cookies.set('token', newToken, { expires: 1 });
          updateUser();
          toast.success('Profile updated successfully!');
          setOpen(false);
        } catch (error) {
          toast.error('Something Went Wrong');
        }
      });
    }
  };

  return (
    <Card className="rounded-t-none pt-6">
      <CardContent>
        <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
          <div className="col-span-12 md:col-span-6">
            <Label htmlFor="firstName" className="mb-2">
              First Name
            </Label>
            <Input
              placeholder="Your first name"
              id="firstName"
              className="capitalize"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={user.name}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Label htmlFor="lastName" className="mb-2">
              Last Name
            </Label>
            <Input
              placeholder="Your last name"
              id="lastName"
              className="capitalize"
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={user.username}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <Label htmlFor="email" className="mb-2">
              Email Address
            </Label>
            <Input
              placeholder="Your email"
              id="email"
              type="email"
              className="lowercase"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={user.email}
            />
          </div>
          <div className="col-span-12 ">
            <Label htmlFor="message" className="mb-2">
              About
            </Label>
            <Textarea
              placeholder="Tell us about yourself"
              id="message"
              className="capitalize"
              onChange={(e) => setAbout(e.target.value)}
              defaultValue={user.about}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button color="secondary" onClick={reset}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (
                firstName !== user.name ||
                lastName !== user.username ||
                email !== user.email ||
                about !== user.about
              ) {
                setOpen(true);
              } else {
                setOpen(false);
                toast.error('No changes made');
              }
            }}
          >
            Save
          </Button>
        </div>
        <SaveConfirmationDialog
          question="Are you sure you want to save these changes?"
          paragraph={null}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleSave}
          defaultToast={false}
          toastMessage=""
        />
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
