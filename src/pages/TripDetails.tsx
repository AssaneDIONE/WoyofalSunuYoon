import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, DollarSign, Navigation, TrendingUp } from 'lucide-react';
import { getBusLines, getLineStops, getBusesByLine } from '../services/mockData';

export default function TripDetails() {
  const { lineId } = useParams<{ lineId: string }>();
  const navigate = useNavigate();

  const line = getBusLines().find((l) => l.id === lineId);
  const stops = getLineStops(lineId || '');
  const buses = getBusesByLine(lineId || '');

  if (!line) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Ligne non trouve!</p>
      </div>
    );
  }

  const totalDistance = stops.reduce((sum, stop) => sum + stop.distanceFromPrevious, 0);
  const totalTime = stops.reduce((sum, stop) => sum + stop.travelTimeMinutes, 0);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8"
      >
        <div
          className="p-4 sm:p-6 text-white"
          style={{ background: `linear-gradient(135deg, ${line.color}, ${line.color}dd)` }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{line.name}</h1>
          <p className="text-sm sm:text-base text-white/90">Complete route information and real-time tracking</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#00853F15' }}>
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#00853F' }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Arrives in</p>
                <p className="text-base sm:text-xl font-bold text-gray-900">{line.estimatedArrival} min</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundColor: '#FCD11615' }}>
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#FCD116' }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Monnaie (FCFA)</p>
                <p className="text-base sm:text-xl font-bold text-gray-900">{line.fare} FCFA</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Distance</p>
                <p className="text-base sm:text-xl font-bold text-gray-900">{totalDistance.toFixed(1)} km</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Temps total</p>
                <p className="text-base sm:text-xl font-bold text-gray-900">{totalTime} min</p>
              </div>
            </div>
          </div>

          <div className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border ${
            line.congestionLevel === 'low'
              ? 'bg-green-50'
              : line.congestionLevel === 'medium'
              ? 'bg-yellow-50'
              : 'bg-red-50'
          }`} style={{
            borderColor: line.congestionLevel === 'low' ? '#00853F40' : line.congestionLevel === 'medium' ? '#FCD11640' : '#E31B2340'
          }}>
            <p className="text-sm sm:text-base font-semibold" style={{
              color: line.congestionLevel === 'low' ? '#00853F' : line.congestionLevel === 'medium' ? '#FCD116' : '#E31B23'
            }}>
              {line.congestionLevel === 'low' && '✓ Optimal Route - Low traffic conditions'}
              {line.congestionLevel === 'medium' && '⚠ Moderate traffic - Some delays expected'}
              {line.congestionLevel === 'high' && '⚠ Heavy traffic - Significant delays possible'}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Route Itinerary</h2>

            <div className="space-y-4">
              {stops.map((stop, index) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base"
                      style={{ backgroundColor: line.color }}
                    >
                      {index + 1}
                    </div>
                    {index < stops.length - 1 && (
                      <div
                        className="w-0.5 h-12 sm:h-16 mt-2"
                        style={{ backgroundColor: `${line.color}40` }}
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-6 sm:pb-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                          {stop.stop.name}
                        </h3>
                        {index > 0 && (
                          <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center">
                              <Navigation className="w-4 h-4 mr-1" />
                              {stop.distanceFromPrevious.toFixed(1)} km
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {stop.travelTimeMinutes} min
                            </span>
                          </div>
                        )}
                      </div>
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Bus Actif </h3>
            <div className="space-y-3">
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  className="p-3 bg-gray-50 rounded-lg border-l-4"
                  style={{ borderLeftColor: line.color }}
                >
                  <p className="font-semibold text-gray-900">{bus.busNumber}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Speed: {Math.round(bus.speed)} km/h
                  </p>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-2 ${
                    bus.congestionLevel === 'low'
                      ? 'bg-green-100 text-green-700'
                      : bus.congestionLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {bus.congestionLevel} traffic
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3">Besoin d'aide ?</h3>
            <p className="text-sm sm:text-base text-blue-50 mb-4">
              Votre les bus sur la carte pour le tracage en temps reel
            </p>
            <button
              onClick={() => navigate('/map')}
              className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Regardez la carte
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
