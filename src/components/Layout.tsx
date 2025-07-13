import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { useIsMobile } from '@/hooks/use-mobile'; // make sure this hook exists

const Layout = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isMobile = useIsMobile();

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar is hidden on small screens */}
        {!isMobile && (
          <aside className="w-64 hidden md:block">
            <Sidebar />
          </aside>
        )}

        <main className={`flex-1 w-full px-4 py-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
