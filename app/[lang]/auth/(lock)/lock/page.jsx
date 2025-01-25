'use client';
import LockForm from './lock-form';

const LockPage = () => {
  return (
    <div className="basis-full lg:basis-1/2 w-full  flex justify-end items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
      <div className="w-full md:w-[440px] xl:w-[570px]  px-5 py-7 md:p-10 lg:p-16  bg-background rounded-xl">
        <LockForm />
      </div>
    </div>
  );
};

export default LockPage;
