import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import avatar5 from "public/images/avatar/avatar-5.jpg";
import avatar6 from "public/images/avatar/avatar-6.jpg";
import avatar7 from "public/images/avatar/avatar-7.jpg";
import avatar8 from "public/images/avatar/avatar-8.jpg";
import avatar9 from "public/images/avatar/avatar-9.jpg";
import avatar10 from "public/images/avatar/avatar-10.jpg";

const AvatarBorder = () => {
  return (
    <>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar5} />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar6} />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar7} />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar8} />
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar9} />
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarImage src={avatar10} />
        <AvatarFallback>IJ</AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarFallback className=" bg-success  text-success-foreground">
          KL
        </AvatarFallback>
      </Avatar>
      <Avatar className=" ring-1 ring-border ring-offset-[3px]  ring-offset-background">
        <AvatarFallback className=" bg-info/10  text-info">FK</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarBorder;
