import AuthProvider from 'provider/authProvider';

const Layout = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Layout;
