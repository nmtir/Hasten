import React from 'react';
import { Card, CardFooter } from 'components/ui/card';
import { getCategory, getBoardsByCategory } from 'config/data.config';

import CategoryHeader from './category-header';
import PageLink from './page-link';

const singleCategoryLayout = async ({ children, params }) => {
  const id = (await params).id;
  const category = await getCategory(id);
  const boards = await getBoardsByCategory(id);
  return (
    <div>
      <Card className="bg-transparent  mb-6 mt-6">
        <CategoryHeader category={category} boards={boards} />
        <CardFooter className="bg-white rounded-b-md gap-x-4 pb-1 pt-1 flex-wrap">
          <PageLink params={params} />
        </CardFooter>
      </Card>
      {children}
    </div>
  );
};

export default singleCategoryLayout;
