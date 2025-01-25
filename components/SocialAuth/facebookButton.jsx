import { startTransition, useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import Image from 'next/image';
import facebook from 'public/images/auth/facebook.png';
import { signInUser } from 'config/user.config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const loadFacebookSDK = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('facebook-jssdk')) {
      resolve(); // If already loaded, resolve immediately
      return;
    }

    window.fbAsyncInit = function () {
      window['FB'].init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, // Replace with your Facebook app ID
        cookie: true, // Enable cookies to allow the server to access the session
        xfbml: true, // Parse social plugins on this webpage
        version: 'v12.0', // Use this Graph API version
      });
      resolve();
    };

    // Load the SDK asynchronously
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
};

const FacebookLoginButton = () => {
  const router = useRouter();
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    loadFacebookSDK()
      .then(() => {
        setSdkLoaded(true);
      })
      .catch((error) => {
        console.log('Facebook SDK failed to load', error);
        toast.error('Failed to load Facebook SDK');
      });
  }, []);

  const handleFacebookLogin = () => {
    if (!sdkLoaded) {
      console.log('Facebook SDK not loaded yet.');
      toast.error('Facebook SDK is not ready yet');
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const { accessToken } = response.authResponse;

          startTransition(async () => {
            try {
              const r = await signInUser('facebook', { accessToken });
              const { token } = r;
              Cookies.set('token', token, { expires: 1 });
              localStorage.setItem('user', JSON.stringify(r.user));
              toast.success('Login Successful');
              router.push('/categories');
            } catch (error) {
              console.log('Login failed:', error);
              toast.error('Login failed. Please try again.');
            }
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
          toast.error("Login failed. User canceled or didn't authorize.");
        }
      },
      { scope: 'public_profile,email' },
    ); // Specify the permissions you need
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="rounded-full border-default-300 hover:bg-transparent"
      onClick={handleFacebookLogin}
    >
      <Image src={facebook} alt="facebook" className="w-5 h-5" />
    </Button>
  );
};

export default FacebookLoginButton;
