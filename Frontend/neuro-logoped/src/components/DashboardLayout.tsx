
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
