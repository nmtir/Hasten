import { startTransition, useEffect } from 'react';
import { Button } from 'components/ui/button'; // Replace with your actual Button component import
import Image from 'next/image';
import googleIcon from 'public/images/auth/google.png'; // Replace with your Google icon path
import { signInUser } from 'config/user.config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const GoogleLoginButton = () => {
  const router = useRouter();

  useEffect(() => {
    const loadGoogleIdentitySDK = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        window.google?.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Your Google Client ID
          callback: handleCredentialResponse,
          use_fedcm_for_prompt: true, // Activates FedCM
        });
      };
      document.body.appendChild(script);
    };

    loadGoogleIdentitySDK();
  }, []);

  const handleCredentialResponse = (response) => {
    const { credential } = response;
    console.log('ID Token:', credential);
    startTransition(async () => {
      try {
        const r = await signInUser('google', {
          idToken: credential,
        });
        toast.success('Login Successful');
        const { token } = r;
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem('user', JSON.stringify(r.user));
        router.push('/categories');
      } catch (error) {
        console.log('Login failed:', error);
        toast.error('Login failed. Please try again.');
      }
    });
  };

  const handleGoogleLogin = () => {
    window.google?.accounts.id.prompt(); // Show the Google sign-in prompt
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="rounded-full border-default-300 hover:bg-transparent"
      onClick={handleGoogleLogin}
    >
      <Image src={googleIcon} alt="google" className="w-5 h-5" />
    </Button>
  );
};

export default GoogleLoginButton;
