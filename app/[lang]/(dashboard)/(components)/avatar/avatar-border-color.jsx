import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import avatar1 from "public/images/avatar/avatar-1.jpg";
import avatar4 from "public/images/avatar/avatar-4.jpg";
import avatar3 from "public/images/avatar/avatar-3.jpg";
import avatar2 from "public/images/avatar/avatar-2.jpg";

const AvatarBorderColor = () => {
  return (
    <>
      <Avatar className=" ring-1 ring-primary ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar1} />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-warning ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar2} />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-success ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar3} />
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-destructive ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar4} />
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-info ring-offset-[3px]  ring-offset-background">
        <AvatarFallback className=" bg-success  text-success-foreground">
          IJ
        </AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-dark ring-offset-[3px]  ring-offset-background">
        <AvatarFallback className=" bg-info/10  text-info">FK</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarBorderColor;
