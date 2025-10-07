import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import BusLineCard from '../components/BusLineCard';
import { getBusLines } from '../services/mockData';

export default function Home() {
  const [destination, setDestination] = useState('');
  const [busLines, setBusLines] = useState(getBusLines());

  const handleSearch = (value: string) => {
    setDestination(value);
    setBusLines(getBusLines(value));
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Sama Yoon
        </h2>
        <p className="text-sm sm:text-base text-gray-600">Trouver son bus en temps reel</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter your destination..."
              value={destination}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm sm:text-base"
              style={{ '--tw-ring-color': '#00853F' } as React.CSSProperties}
            />
          </div>
          <button className="text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg transition-all flex items-center space-x-2 font-semibold shadow-md hover:shadow-lg" style={{ backgroundColor: '#00853F' }}>
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </motion.div>

      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
          {destination ? 'Available Routes' : 'All Bus Lines'}
        </h3>
        {busLines.length === 0 && destination && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              Pas de routes trouves "{destination}". Lister les lignes accessibles.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {busLines.map((line, index) => (
          <BusLineCard key={line.id} line={line} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 sm:mt-8 rounded-xl p-4 sm:p-6 text-white"
        style={{ background: 'linear-gradient(to right, #00853F, #FCD116)' }}
      >
        <h3 className="text-lg sm:text-xl font-bold mb-2">Donnees en temps reels</h3>
        <p className="text-sm sm:text-base text-blue-50">
          Position des bus en temps reel chaque 10 seconds. Temps d'arrive calcules en fonctions du trafic.
        </p>
      </motion.div>
    </div>
  );
}
