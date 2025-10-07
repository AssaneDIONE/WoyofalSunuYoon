import { Clock, DollarSign, TrendingUp, Bus } from 'lucide-react';
import { BusLine } from '../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface BusLineCardProps {
  line: BusLine;
  index: number;
}

export default function BusLineCard({ line, index }: BusLineCardProps) {
  const navigate = useNavigate();

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-50';
      case 'medium':
        return 'bg-yellow-50';
      case 'high':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getCongestionTextColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#00853F';
      case 'medium':
        return '#FCD116';
      case 'high':
        return '#E31B23';
      default:
        return '#6B7280';
    }
  };

  const getCongestionText = (level: string) => {
    switch (level) {
      case 'low':
        return 'Low Traffic';
      case 'medium':
        return 'Medium Traffic';
      case 'high':
        return 'High Traffic';
      default:
        return 'Unknown';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => navigate(`/trip/${line.id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 cursor-pointer border-l-4 active:scale-[0.98] sm:hover:scale-[1.02]"
      style={{ borderLeftColor: line.color }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div
            className="p-2 sm:p-3 rounded-lg"
            style={{ backgroundColor: `${line.color}15` }}
          >
            <Bus className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: line.color }} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{line.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">Direct route available</p>
          </div>
        </div>
        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getCongestionColor(line.congestionLevel)}`} style={{ color: getCongestionTextColor(line.congestionLevel) }}>
          {getCongestionText(line.congestionLevel)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <div className="p-1.5 sm:p-2 rounded-lg" style={{ backgroundColor: '#00853F15' }}>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#00853F' }} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Arrives in</p>
            <p className="text-sm font-bold text-gray-900">{line.estimatedArrival} min</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <div className="bg-green-50 p-1.5 sm:p-2 rounded-lg">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Fare (FCFA)</p>
            <p className="text-sm font-bold text-gray-900">{line.fare} FCFA</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <div className="bg-purple-50 p-1.5 sm:p-2 rounded-lg">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm font-bold text-gray-900">Active</p>
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
        <p className="text-xs sm:text-sm text-gray-600">
          {line.congestionLevel === 'low' && '✓ Recommended route - fastest option'}
          {line.congestionLevel === 'medium' && '⚠ Moderate delays expected'}
          {line.congestionLevel === 'high' && '⚠ Heavy traffic - consider alternative'}
        </p>
      </div>
    </motion.div>
  );
}
