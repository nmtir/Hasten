import React from "react";
import { Settings } from "components/svg";
import Image from "next/image";
import { useUser } from "provider/userProvider";
import { CldImage } from "next-cloudinary";
import avatar from "public/images/avatar/emptyImage.png";

const imageLoader = ({ src }) => {
  return `${src}`
}
const FooterMenu = () => {
  const { user } = useUser();
  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <button
        className="w-11 h-11 mx-auto text-default-500 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
        <Settings className="h-8 w-8" />
      </button>
      <div>
        {user.image ? (
          <CldImage
            loader={imageLoader}
            src={user.image}
            width="36"
            height="36"
            alt="avatar"
            className="rounded-full"
          />
        ) : (
          <Image
            src={avatar}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default FooterMenu;
