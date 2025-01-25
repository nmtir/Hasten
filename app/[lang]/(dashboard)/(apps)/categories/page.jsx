import CategoriesView from './categories-view';
import { getCategoriesByUser, getUser } from 'config/data.config';

export default async function CategoryPage() {
  const user = await getUser();
  const categories = await getCategoriesByUser(user.id);
  return (
    <div>
      <CategoriesView categories={categories} />
    </div>
  );
}
