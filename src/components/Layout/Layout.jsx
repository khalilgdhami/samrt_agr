import { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main
        className={`
          flex-1 min-h-screen transition-all duration-300
          ${sidebarOpen ? 'ml-60' : 'ml-[70px]'}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;