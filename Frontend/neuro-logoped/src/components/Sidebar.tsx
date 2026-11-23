
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      if (!token) return;

      try {
        const response = await fetch(
          'https://localhost:7120/api/test/protected',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (error) {
        console.error('Could not load user information:', error);
      }
    }

    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login', { replace: true });
  }

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '⌂' },
    { name: 'My Exercises', path: '/exercises', icon: '▤' },
    { name: 'My Progress', path: '/progress', icon: '↗' },
    { name: 'My Activity', path: '/activity', icon: '◷' },
    { name: 'My Profile', path: '/profile', icon: '♙' },
  ];

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Loading...';

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo />
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">MAIN MENU</p>

        <nav className="sidebar-navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user ? user.firstName.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="sidebar-user-info">
            <span className="sidebar-user-name">
              {fullName}
            </span>

            <span className="sidebar-user-email">
              {user ? user.email : 'NeuroLogoped'}
            </span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <span className="sidebar-icon">↪</span>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
