'use client';

import { Button } from 'components/ui/button';
import { Card, CardContent } from 'components/ui/card';
import { Label } from 'components/ui/label';
import avatar from 'public/images/avatar/emptyImage.png';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { updateUserImage, deleteUser } from 'config/user.config';
import React, { startTransition, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from 'provider/userProvider';
import DeleteConfirmationDialog from 'components/delete-confirmation-dialog';
import Cookies from 'js-cookie';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';

const imageLoader = ({ src }) => {
  return `${src}`;
};
const UserMeta = () => {
  const { user, updateUser } = useUser();

  const token = Cookies.get('token');
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccessImageDelete, setIsSuccessImageDelete] = useState(false);
  const [isErrorImageDelete, setIsErrorImageDelete] = useState(false);
  const [isSuccessImageUpload, setIsSuccessImageUpload] = useState(false);
  const [isErrorImageUpload, setIsErrorImageUpload] = useState(false);
  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteUser(user, token);
        toast.success('user deleted successfully');
        Cookies.remove('token');
        window.location.href = '/auth/login';
      } catch (error) {
        console.log(e);
        toast.error('Failed to delete user');
      }
    });
  };
  const formRef = useRef(null);

  const handleFileChange = (event) => {
    setIsUploading(true);
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    startTransition(async () => {
      try {
        const r = await updateUserImage(user.id, formData, token);
        const { token: newToken } = r;
        Cookies.set('token', newToken, { expires: 1 });
        updateUser();
        toast.success('Profile image updated successfully');
        setIsUploading(false);
        setIsSuccessImageUpload(true);
      } catch (error) {
        setIsUploading(false);
        setIsErrorImageUpload(true);
        toast.error('Failed to update profile image');
      }
    });
    setTimeout(() => {
      setIsSuccessImageUpload(false);
      setIsErrorImageUpload(false);
    }, 4000);
  };

  const handleImageDelete = () => {
    console.log('deleting....');
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsSuccessImageDelete(true);
      setTimeout(() => {
        setIsSuccessImageDelete(false);
      }, 700);
    }, 4000);
  };

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-[124px] h-[124px] bg-transparent relative border rounded-full">
          {user.image ? (
            <CldImage
              loader={imageLoader}
              src={user.image}
              width="124"
              height="124"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
              priority={true}
            />
          ) : (
            <Image
              src={avatar}
              alt="avatar"
              width={124}
              height={124}
              className="w-full h-full object-cover rounded-full"
              priority
            />
          )}
          <Button
            onClick={() => setOpen(true)}
            asChild
            size="icon"
            className="h-4 w-4 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer absolute top-0 right-0"
          >
            <Label>
              <Icon className="w-5 h-5 text-white" icon="heroicons:x-mark" />
            </Label>
          </Button>
          <div
            className="group w-16 h-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Icon */}
            <div
              className={`absolute bottom-0 right-0 transition-opacity duration-300 flex items-center justify-center ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {!isHovered && (
                <Icon
                  className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                  icon="line-md:image"
                />
              )}
            </div>

            {/* Child Icons */}
            <div
              className={`absolute bottom-0 right-0 flex flex-col items-end gap-1 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isHovered && (
                <>
                  {/* Upload Icon with Tooltip */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="avatarUpload">
                          {!isUploading &&
                            !isSuccessImageUpload &&
                            !isErrorImageUpload && (
                              <Icon
                                className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                                icon="line-md:cloud-alt-upload"
                              />
                            )}
                          {isUploading && (
                            <Icon
                              className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                              icon="line-md:loading-alt-loop"
                            />
                          )}
                          {isSuccessImageUpload && !isUploading && (
                            <Icon
                              className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                              icon="line-md:confirm"
                            />
                          )}
                          {isErrorImageUpload && !isUploading && (
                            <Icon
                              className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                              icon="line-md:line-md:close-circle"
                            />
                          )}
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="capitalize">
                        {user.image ? 'Change Image' : 'Upload Image'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Delete Icon with Tooltip */}
                  {user.image && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {!isDeleting &&
                            !isSuccessImageDelete &&
                            !isErrorImageDelete && (
                              <Icon
                                className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                                icon="line-md:cloud-alt-off-loop"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImageDelete();
                                }}
                              />
                            )}
                          {isDeleting && (
                            <Icon
                              className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                              icon="line-md:loading-alt-loop"
                            />
                          )}
                          {isSuccessImageDelete && !isDeleting && (
                            <Icon
                              className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                              icon="line-md:confirm"
                            />
                          )}
                          {isErrorImageDelete && !isDeleting && (
                            <Icon
                              className="w-8 h-8 text-white bg-primary p-1 rounded-full cursor-pointer"
                              icon="line-md:line-md:close-circle"
                            />
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="capitalize">
                          Delete Image
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </>
              )}
            </div>
          </div>
          <form ref={formRef} method="POST" encType="multipart/form-data">
            <input
              type="file"
              className="hidden"
              id="avatarUpload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </form>
        </div>
        <div className="mt-4 text-xl font-semibold text-default-900 capitalize">
          {user.name + ' ' + user.username}
        </div>
        <div className="mt-1.5 text-sm font-medium text-default-500 lowercase">
          {user.email}
        </div>
        <DeleteConfirmationDialog
          question="Are you sure you want to delete this user?"
          paragraph="This action cannot be undone. This will permanently delete your
            data and remove your data from our servers."
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          defaultToast={false}
        />
      </CardContent>
    </Card>
  );
};

export default UserMeta;
