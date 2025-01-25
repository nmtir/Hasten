import React from "react";
import {
  Collapsible,
  CollapsibleContent,

} from "components/ui/collapsible";
import { getDynamicPath } from "lib/utils";
import { usePathname } from "next/navigation";

const MultiNestedMenu = ({ subIndex, activeMultiMenu }) => {
  const pathname = usePathname();
  getDynamicPath(pathname);

  return (
    <Collapsible open={activeMultiMenu === subIndex}>
      <CollapsibleContent className="CollapsibleContent">
        <ul className="space-y-3 pl-1">
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MultiNestedMenu;
