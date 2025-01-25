'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from 'components/ui/card';
import { getCategoriesByUser } from 'config/category-config';
import { useUser } from 'provider/userProvider';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import CategoryGrid from './category-grid';
import CategoryList from './category-list';
import { cn } from 'lib/utils';
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
import { DataTableToolbar } from './category-list/components/data-table-toolbar';
import Blank from 'components/blank';
import CreateCategory from './create-category';
import { isColorDark } from '../../../../../components/common/common';
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const CategoriesView = ({ categories, location }) => {
  const { user } = useUser();
  const [pageView, setPageView] = React.useState('grid');
  const [open, setOpen] = React.useState(false);
  // table state
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const openCreateCategory = () => {
    console.log('open:', open);
    setOpen(true);
  };
  const closeCreateCategory = () => {
    setOpen(false);
    setSelectedCategory(null);
    wait().then(() => (document.body.style.pointerEvents = 'auto'));
  };
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const table = useReactTable({
    data: categories,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

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
              board={null}
              boardId={null}
              userId={user.id}
              edit={false}
              location={location}
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
          board={null}
          boardId={null}
          userId={user.id}
          edit={false}
        />
      </div>
    </div>
  );
};

export default CategoriesView;
