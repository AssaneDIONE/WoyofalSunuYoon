import { Bus, Home, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pb-20 md:pb-0">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl group-hover:scale-110 transition-transform" style={{ backgroundColor: '#00853F' }}>
                <Bus className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Woyofal Sunu Yoon</h1>
                <p className="text-xs md:text-sm text-gray-500">Vous guidez dans vos deplacements</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={location.pathname === '/' ? { backgroundColor: '#00853F' } : {}}
              >
                Home
              </Link>
              <Link
                to="/map"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/map'
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={location.pathname === '/map' ? { backgroundColor: '#00853F' } : {}}
              >
                Map
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="pb-4">{children}</main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-2 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              location.pathname === '/'
                ? 'bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={location.pathname === '/' ? { color: '#00853F' } : {}}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Accueil</span>
          </Link>
          <Link
            to="/map"
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              location.pathname === '/map'
                ? 'bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={location.pathname === '/map' ? { color: '#00853F' } : {}}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs font-medium">Carte</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
