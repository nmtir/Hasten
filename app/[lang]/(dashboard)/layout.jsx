import DashBoardLayoutProvider from 'provider/dashboard.layout.provider';
import { getDictionary } from 'app/dictionaries';
import { getCategoriesByUser, getUser } from 'config/data.config';

const layout = async ({ children }) => {
  const trans = await getDictionary('en');
  const user = await getUser();
  const categories = await getCategoriesByUser(user.id);
  return (
    <DashBoardLayoutProvider user={user} categories={categories} trans={trans}>
      {children}
    </DashBoardLayoutProvider>
  );
};

export default layout;
