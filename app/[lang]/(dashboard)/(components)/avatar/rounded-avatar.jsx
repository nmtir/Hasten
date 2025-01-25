import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import avatar3 from "public/images/avatar/avatar-3.jpg";
import avatar4 from "public/images/avatar/avatar-4.jpg";
import avatar2 from "public/images/avatar/avatar-2.jpg";
import avatar1 from "public/images/avatar/avatar-1.jpg";

const RoundedAvatar = () => {
  return (
    <>
      <Avatar className=" rounded-md">
        <AvatarImage src={avatar1} />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className=" rounded-lg">
        <AvatarImage src={avatar2} />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className=" rounded-xl">
        <AvatarImage src={avatar3} />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={avatar4} />
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </>
  );
};

export default RoundedAvatar;
