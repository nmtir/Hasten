import { Breadcrumbs, BreadcrumbItem } from "components/ui/breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { PathContext } from "provider/providers";

const CollapsingBreadcrumbs = () => {
  const { taskPath } = useContext(PathContext);
  const newPath = taskPath.map((item, index) => {
    if (index === 0 || index === taskPath.length - 1) {
      return null;
    }
    return item;
  }).filter(item => item !== null);

  return (
    <>
      <Breadcrumbs
        underline="hover"
        color="yourVariant"
        variant="yourModifier"
        maxItems={taskPath.length - 2}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={1}
        renderEllipsis={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className=" cursor-pointer bg-muted px-2 rounded-full inline-flex items-center">
                <Icon
                  icon="heroicons:ellipsis-horizontal"
                  className=" h-5 w-5  "
                />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="start">
              {
                newPath.map((item) => (
                  <BreadcrumbItem>{item}</BreadcrumbItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        }
      >
        {
          taskPath.map((item) => (
            <BreadcrumbItem>{item}</BreadcrumbItem>
          ))
        }
      </Breadcrumbs>
    </>
  );
};

export default CollapsingBreadcrumbs;
