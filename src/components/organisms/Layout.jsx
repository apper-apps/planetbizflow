import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-bg-subtle">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
<div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;