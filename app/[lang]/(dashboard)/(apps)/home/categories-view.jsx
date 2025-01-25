'use client';
import React from 'react';
import { Card, CardContent } from 'components/ui/card';
import { useUser } from 'provider/userProvider';
import { Plus } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import CategoryGrid from './category-grid';
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './category-list/components/columns';
import Blank from 'components/blank';
import CreateCategory from './create-category';
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const CategoriesView = ({ categories }) => {
  const { user } = useUser();
  const [pageView, setPageView] = React.useState('grid');
  const [open, setOpen] = React.useState(false);
  // table state
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const openCreateCategory = () => {
    setOpen(true);
  };
  const closeCreateCategory = () => {
    setOpen(false);
    wait().then(() => (document.body.style.pointerEvents = 'auto'));
    setSelectedCategory(null);
  };
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  if (categories.length < 1) {
    return (
      <div className="bg-white mt-6 rounded-xl shadow-2xl px-10 py-10 ">
        <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
          <div className=" text-default-900 text-xl font-semibold">
            No Category Here
          </div>
          <div className=" text-sm  text-default-600 ">
            Create Your First Category.
          </div>
          <div></div>
          <Button onClick={openCreateCategory}>
            <Plus className="w-4 h-4 text-primary-foreground mr-2" />
            Create Category
          </Button>
          <div>
            <CreateCategory
              open={open}
              category={selectedCategory}
              onClose={closeCreateCategory}
            />
          </div>
        </Blank>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 space-y-5">
        <Card>
          <CardContent className="50 pt-6">
            <div className="flex lg:flex-row flex-col mb-4 flex-wrap gap-6">
              <div className="flex-1 flex gap-3">
                <Button
                  onClick={openCreateCategory}
                  className="whitespace-nowrap"
                >
                  <Plus className="w-4 h-4  ltr:mr-2 rtl:ml-2" />
                  Create Category
                </Button>
              </div>
              <div className=" flex-none  flex flex-wrap gap-3">
                <Input placeholder="search..." />
              </div>
            </div>
            <div className="grid bg-white  xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
              {categories?.map((category, i) => (
                <CategoryGrid
                  setSelectedCategory={setSelectedCategory}
                  openCreateCategory={openCreateCategory}
                  category={category}
                  key={`category-grid-${i}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <CreateCategory
          open={open}
          onClose={closeCreateCategory}
          category={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default CategoriesView;
