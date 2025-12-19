import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, offlineMode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: 8,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: 400
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
          Admin Login
        </h1>
        {offlineMode && (
          <div style={{
            background: '#d1ecf1',
            color: '#0c5460',
            padding: '1rem',
            borderRadius: 4,
            marginBottom: '1rem',
            fontSize: '0.9rem',
            border: '1px solid #bee5eb'
          }}>
            <strong>🎨 Demo Mode Available</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
              Firebase is not configured. You can still test the admin UI:
            </p>
            <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem', fontSize: '0.85rem' }}>
              <li><strong>Email:</strong> any email (e.g., admin@demo.com)</li>
              <li><strong>Password:</strong> "demo" or "test"</li>
            </ul>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', fontStyle: 'italic' }}>
              Note: Changes won't be saved in demo mode. Set up Firebase to enable full functionality.
            </p>
          </div>
        )}
        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: 4,
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: 600
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="admin@example.com"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: 600
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: 4,
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#95a5a6' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#7f8c8d'
        }}>
          Sagars Homeopathy Admin Panel
        </div>
      </div>
    </div>
  );
}
