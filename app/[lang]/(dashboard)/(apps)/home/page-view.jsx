'use client';
import CategoryView from './categories-view';
import WelcomeBlock from './components/welcome-block';
import ReportsCard from './components/reports';
import { usePathname } from 'next/navigation';

const HomePageView = ({ categories, user }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800"></div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 mt-10 md:mt-0">
          <WelcomeBlock user={user} />
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
            <ReportsCard />
          </div>
        </div>
      </div>
      <CategoryView user={user} categories={categories}></CategoryView>
    </div>
  );
};

export default HomePageView;
