'use client';
import CreatePasswordForm from './create-password-form';
import { useParams } from 'next/navigation';

const LoginPage = () => {
  const params = useParams();
  const { hash } = params;

  return (
    <div className="basis-full lg:basis-1/2 w-full  flex justify-end items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
      <div className="px-5 py-5 bg-background rounded-xl shadow-2xl">
        <CreatePasswordForm hash={hash} />
      </div>
    </div>
  );
};

export default LoginPage;
