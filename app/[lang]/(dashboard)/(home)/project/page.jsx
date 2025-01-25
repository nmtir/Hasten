import { getDictionary } from "app/dictionaries";
import CategoryPageView from "./page-view";

const CategoryPage = async () => {
  const trans = await getDictionary('en');
  return <CategoryPageView trans={trans} />;
};

export default CategoryPage;
