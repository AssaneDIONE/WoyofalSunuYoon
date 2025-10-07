import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { Navigation, Activity } from 'lucide-react';
import { buses as initialBuses, busStops, lineStops, simulateBusMovement } from '../services/mockData';
import { Bus } from '../types';
import 'leaflet/dist/leaflet.css';

const busIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDdiZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOCAzMGgzYTEgMSAwIDAgMCAxLTFWNWExIDEgMCAwIDAtMS0xSDhhMSAxIDAgMCAwLTEgMXYyNGExIDEgMCAwIDAgMSAxWiIvPjxjaXJjbGUgY3g9IjciIGN5PSIxOSIgcj0iMiIvPjxjaXJjbGUgY3g9IjE3IiBjeT0iMTkiIHI9IjIiLz48cGF0aCBkPSJNMyA2aDIxYTEgMSAwIDAgMSAxIDF2MTBhMSAxIDAgMCAxLTEgMUgzYTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAwIDEgMS0xWiIvPjwvc3ZnPg==',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const stopIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZTc0YzNjIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIvPjwvc3ZnPg==',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

export default function MapView() {
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [selectedLine, setSelectedLine] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => simulateBusMovement(bus))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredBuses = selectedLine === 'all'
    ? buses
    : buses.filter((bus) => bus.lineId === selectedLine);

  const getLineColor = (lineId: string) => {
    const colors: Record<string, string> = {
      'line-24': '#00853F',
      'line-12': '#FCD116',
      'line-7': '#E31B23',
      'line-35': '#00853F',
    };
    return colors[lineId] || '#00853F';
  };

  const center: [number, number] = [14.6937, -17.4441];

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-88px)] flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-80 bg-white shadow-lg p-4 md:p-6 overflow-y-auto max-h-64 md:max-h-none"
      >
        <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#00853F' }}>
            <Navigation className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Live Map</h2>
        </div>

        <div className="mb-4 md:mb-6">
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Filter by Line
          </label>
          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
            style={{ '--tw-ring-color': '#00853F' } as React.CSSProperties}
          >
            <option value="all">All Lines</option>
            <option value="line-24">Line 24</option>
            <option value="line-12">Line 12</option>
            <option value="line-7">Line 7</option>
            <option value="line-35">Line 35</option>
          </select>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
            <Activity className="w-4 h-4" />
            <span>{filteredBuses.length} buses active</span>
          </div>

          {filteredBuses.slice(0, 3).map((bus) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-3 md:p-4 border-l-4"
              style={{ borderLeftColor: getLineColor(bus.lineId) }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm md:text-base font-semibold text-gray-900">{bus.busNumber}</p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {bus.lineId.replace('line-', 'Line ')}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                  bus.congestionLevel === 'low'
                    ? 'bg-green-100'
                    : bus.congestionLevel === 'medium'
                    ? 'bg-yellow-100'
                    : 'bg-red-100'
                }`} style={{
                  color: bus.congestionLevel === 'low' ? '#00853F' : bus.congestionLevel === 'medium' ? '#FCD116' : '#E31B23'
                }}>
                  {bus.congestionLevel}
                </div>
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                <p>Speed: {Math.round(bus.speed)} km/h</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {busStops.map((stop) => (
            <CircleMarker
              key={stop.id}
              center={[stop.latitude, stop.longitude]}
              radius={8}
              fillColor="#e74c3c"
              color="#fff"
              weight={2}
              fillOpacity={0.8}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{stop.name}</p>
                  <p className="text-gray-600">Bus Stop</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {Object.entries(lineStops).map(([lineId, stops]) => {
            if (selectedLine !== 'all' && lineId !== selectedLine) return null;

            const positions: [number, number][] = stops.map((stop) => [
              stop.stop.latitude,
              stop.stop.longitude,
            ]);

            return (
              <Polyline
                key={lineId}
                positions={positions}
                color={getLineColor(lineId)}
                weight={3}
                opacity={0.6}
              />
            );
          })}

          {filteredBuses.map((bus) => (
            <Marker
              key={bus.id}
              position={[bus.latitude, bus.longitude]}
              icon={busIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{bus.busNumber}</p>
                  <p className="text-gray-600">
                    {bus.lineId.replace('line-', 'Line ')}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Speed: {Math.round(bus.speed)} km/h
                  </p>
                  <p className="text-gray-600">
                    Traffic: <span className="capitalize">{bus.congestionLevel}</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
