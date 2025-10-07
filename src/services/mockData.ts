import { BusLine, BusStop, Bus, LineStop } from '../types';

export const busStops: BusStop[] = [
  { id: '1', name: "Place de l'Indépendance", latitude: 14.6937, longitude: -17.4441 },
  { id: '2', name: 'Gare Routière Pompiers', latitude: 14.6924, longitude: -17.4467 },
  { id: '3', name: 'Sandaga', latitude: 14.6761, longitude: -17.4478 },
  { id: '4', name: 'Médina', latitude: 14.6892, longitude: -17.4567 },
  { id: '5', name: 'Université Cheikh Anta Diop', latitude: 14.6947, longitude: -17.4786 },
  { id: '6', name: "Rond-Point Jet d'Eau", latitude: 14.7009, longitude: -17.4456 },
  { id: '7', name: 'Colobane', latitude: 14.6844, longitude: -17.4542 },
  { id: '8', name: 'Grand Yoff', latitude: 14.7389, longitude: -17.4672 },
];

export const lineStops: Record<string, LineStop[]> = {
  'line-24': [
    { id: 'ls1', lineId: 'line-24', stopId: '1', stopOrder: 1, distanceFromPrevious: 0, travelTimeMinutes: 0, stop: busStops[0] },
    { id: 'ls2', lineId: 'line-24', stopId: '2', stopOrder: 2, distanceFromPrevious: 0.5, travelTimeMinutes: 3, stop: busStops[1] },
    { id: 'ls3', lineId: 'line-24', stopId: '3', stopOrder: 3, distanceFromPrevious: 2.1, travelTimeMinutes: 8, stop: busStops[2] },
    { id: 'ls4', lineId: 'line-24', stopId: '4', stopOrder: 4, distanceFromPrevious: 1.3, travelTimeMinutes: 5, stop: busStops[3] },
    { id: 'ls5', lineId: 'line-24', stopId: '5', stopOrder: 5, distanceFromPrevious: 2.8, travelTimeMinutes: 12, stop: busStops[4] },
  ],
  'line-12': [
    { id: 'ls6', lineId: 'line-12', stopId: '6', stopOrder: 1, distanceFromPrevious: 0, travelTimeMinutes: 0, stop: busStops[5] },
    { id: 'ls7', lineId: 'line-12', stopId: '1', stopOrder: 2, distanceFromPrevious: 1.2, travelTimeMinutes: 6, stop: busStops[0] },
    { id: 'ls8', lineId: 'line-12', stopId: '7', stopOrder: 3, distanceFromPrevious: 1.8, travelTimeMinutes: 7, stop: busStops[6] },
    { id: 'ls9', lineId: 'line-12', stopId: '8', stopOrder: 4, distanceFromPrevious: 5.5, travelTimeMinutes: 18, stop: busStops[7] },
  ],
  'line-7': [
    { id: 'ls10', lineId: 'line-7', stopId: '3', stopOrder: 1, distanceFromPrevious: 0, travelTimeMinutes: 0, stop: busStops[2] },
    { id: 'ls11', lineId: 'line-7', stopId: '4', stopOrder: 2, distanceFromPrevious: 1.5, travelTimeMinutes: 6, stop: busStops[3] },
    { id: 'ls12', lineId: 'line-7', stopId: '7', stopOrder: 3, distanceFromPrevious: 0.8, travelTimeMinutes: 4, stop: busStops[6] },
  ],
  'line-35': [
    { id: 'ls13', lineId: 'line-35', stopId: '5', stopOrder: 1, distanceFromPrevious: 0, travelTimeMinutes: 0, stop: busStops[4] },
    { id: 'ls14', lineId: 'line-35', stopId: '4', stopOrder: 2, distanceFromPrevious: 3.2, travelTimeMinutes: 13, stop: busStops[3] },
    { id: 'ls15', lineId: 'line-35', stopId: '6', stopOrder: 3, distanceFromPrevious: 2.0, travelTimeMinutes: 8, stop: busStops[5] },
    { id: 'ls16', lineId: 'line-35', stopId: '8', stopOrder: 4, distanceFromPrevious: 4.8, travelTimeMinutes: 15, stop: busStops[7] },
  ],
};

export const buses: Bus[] = [
  {
    id: 'bus-1',
    lineId: 'line-24',
    busNumber: 'B-24-01',
    latitude: 14.6920,
    longitude: -17.4450,
    speed: 25,
    congestionLevel: 'low',
    lastUpdated: new Date(),
  },
  {
    id: 'bus-2',
    lineId: 'line-24',
    busNumber: 'B-24-02',
    latitude: 14.6810,
    longitude: -17.4520,
    speed: 15,
    congestionLevel: 'medium',
    lastUpdated: new Date(),
  },
  {
    id: 'bus-3',
    lineId: 'line-12',
    busNumber: 'B-12-01',
    latitude: 14.6980,
    longitude: -17.4460,
    speed: 30,
    congestionLevel: 'low',
    lastUpdated: new Date(),
  },
  {
    id: 'bus-4',
    lineId: 'line-7',
    busNumber: 'B-07-01',
    latitude: 14.6830,
    longitude: -17.4510,
    speed: 10,
    congestionLevel: 'high',
    lastUpdated: new Date(),
  },
  {
    id: 'bus-5',
    lineId: 'line-35',
    busNumber: 'B-35-01',
    latitude: 14.6950,
    longitude: -17.4700,
    speed: 20,
    congestionLevel: 'medium',
    lastUpdated: new Date(),
  },
];

export function getBusLines(destination?: string): BusLine[] {
  const lines = [
    { id: 'line-24', name: 'Line 24', color: '#00853F', fare: 500, congestionLevel: 'low' as const, estimatedArrival: 3 },
    { id: 'line-12', name: 'Line 12', color: '#FCD116', fare: 500, congestionLevel: 'low' as const, estimatedArrival: 5 },
    { id: 'line-7', name: 'Line 7', color: '#E31B23', fare: 350, congestionLevel: 'high' as const, estimatedArrival: 8 },
    { id: 'line-35', name: 'Line 35', color: '#00853F', fare: 600, congestionLevel: 'medium' as const, estimatedArrival: 6 },
  ];

  if (destination) {
    const filtered = lines.filter(line => {
      const stops = lineStops[line.id] || [];
      return stops.some(stop =>
        stop.stop.name.toLowerCase().includes(destination.toLowerCase())
      );
    });
    return filtered.length > 0 ? filtered : lines;
  }

  return lines;
}

export function getBusesByLine(lineId: string): Bus[] {
  return buses.filter(bus => bus.lineId === lineId);
}

export function getLineStops(lineId: string): LineStop[] {
  return lineStops[lineId] || [];
}

export function simulateBusMovement(bus: Bus): Bus {
  const angle = Math.random() * Math.PI * 2;
  const distance = 0.001;

  return {
    ...bus,
    latitude: bus.latitude + Math.cos(angle) * distance,
    longitude: bus.longitude + Math.sin(angle) * distance,
    speed: Math.max(5, Math.min(40, bus.speed + (Math.random() - 0.5) * 10)),
    lastUpdated: new Date(),
  };
}
