import '../assets/scss/globals.scss';
import '../assets/scss/theme.scss';
import { siteConfig } from 'config/site';
import Providers from 'provider/providers';
import 'simplebar-react/dist/simplebar.min.css';
import TanstackProvider from 'provider/providers.client';
import DirectionProvider from 'provider/direction.provider';
import { UserProvider } from 'provider/userProvider';

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang={'en'} className="overflow-y-scroll" suppressHydrationWarning>
      <Providers>
        <UserProvider>
          <TanstackProvider>
            <DirectionProvider lang={'en'}>{children}</DirectionProvider>
          </TanstackProvider>
        </UserProvider>
      </Providers>
    </html>
  );
}
