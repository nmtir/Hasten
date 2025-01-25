'use client';
import VerifyForm from './verify-form';
import { useParams } from 'next/navigation';

const VerifyPage = () => {
  const params = useParams();
  const { hash } = params;
  return (
    <div className="basis-full lg:basis-1/2 w-full  flex justify-end items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
      <div className="px-5 py-5 bg-background rounded-xl shadow-2xl">
        <VerifyForm hash={hash} />
      </div>
    </div>
  );
};

export default VerifyPage;
