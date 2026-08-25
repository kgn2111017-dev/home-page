import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import Admin from './components/Admin';
import AuthModal from './components/AuthModal';
import SignupPage from './components/SignupPage';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
      return 'admin';
    }
    if (path === '/signup' || hash === '#/signup' || hash === '#signup') {
      return 'signup';
    }
    return 'home';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('pungeo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        setCurrentView('admin');
      } else if (path === '/signup' || hash === '#/signup' || hash === '#signup') {
        setCurrentView('signup');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (view) => {
    if (view === 'admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentView('admin');
    } else if (view === 'signup') {
      window.history.pushState({}, '', '/signup');
      setCurrentView('signup');
    } else {
      window.history.pushState({}, '', '/');
      setCurrentView('home');
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('pungeo_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pungeo_user');
  };

  return (
    <>
      {currentView === 'admin' ? (
        <Admin onNavigate={navigateTo} />
      ) : currentView === 'signup' ? (
        <SignupPage 
          onNavigate={navigateTo}
          onOpenLogin={() => {
            navigateTo('home');
            setIsAuthModalOpen(true);
          }}
        />
      ) : (
        <Homepage 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onNavigate={navigateTo}
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
        onOpenSignup={() => {
          setIsAuthModalOpen(false);
          navigateTo('signup');
        }}
      />
    </>
  );
}

export default App;

