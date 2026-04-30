import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from '../ui/Notification';

const NO_FOOTER = ['/login', '/register'];

export default function Layout() {
  const { pathname } = useLocation();
  const showFooter = !NO_FOOTER.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Notification />
      <main className="flex-1">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
