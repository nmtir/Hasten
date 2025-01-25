import HomePageView from './page-view';
import { getCategoriesByUser, getUser } from 'config/data.config';

const HomePage = async () => {
  const user = await getUser();
  const categories = await getCategoriesByUser(user.id);
  return <HomePageView user={user} categories={categories} />;
};

export default HomePage;
