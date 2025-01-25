import { Breadcrumbs, BreadcrumbItem } from "components/ui/breadcrumbs";
import { useContext } from "react";
import { PathContext } from "provider/providers";

const DefaultBreadCrumb = () => {
  const { taskPath } = useContext(PathContext);
  console.log("path:");
  console.log(taskPath);
  console.log("??");

  return (
    <Breadcrumbs underline="hover">
      {taskPath.map((item, index) => (
        <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default DefaultBreadCrumb;
