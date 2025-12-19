import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FIREBASE_ENABLED } from '../config/firebase';

export function AdminLayout() {
  const { signOut, currentUser, offlineMode } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5', flexDirection: 'column' }}>
      {/* Demo Mode Banner */}
      {offlineMode && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          🎨 <strong>DEMO MODE</strong> - Firebase not configured. Changes won't be saved. |
          <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem' }}>
            Set up Firebase to enable full functionality
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flex: 1 }}>
      {/* Sidebar */}
      <aside style={{
        width: 250,
        background: '#2c3e50',
        color: 'white',
        padding: '2rem 1rem',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.5rem', fontWeight: 600 }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            to="/admin"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1rem',
              borderRadius: 4,
              transition: 'background 0.2s',
              background: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#34495e'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/reviews"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1rem',
              borderRadius: 4,
              transition: 'background 0.2s',
              background: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#34495e'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Manage Reviews
          </Link>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1rem',
              borderRadius: 4,
              transition: 'background 0.2s',
              background: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#34495e'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            View Public Site
          </Link>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #34495e' }} />
          <div style={{ fontSize: '0.85rem', color: '#bdc3c7', padding: '0.5rem 1rem' }}>
            Logged in as: <br />
            <strong style={{ color: 'white' }}>{currentUser?.email}</strong>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              padding: '0.75rem 1rem',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 4,
              fontSize: '1rem',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#c0392b'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#e74c3c'}
          >
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        marginLeft: 250
      }}>
        <Outlet />
      </main>
      </div>
    </div>
  );
}
