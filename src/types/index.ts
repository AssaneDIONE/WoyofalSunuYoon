export interface BusLine {
  id: string;
  name: string;
  color: string;
  fare: number;
  congestionLevel: 'low' | 'medium' | 'high';
  estimatedArrival: number;
}

export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Bus {
  id: string;
  lineId: string;
  busNumber: string;
  latitude: number;
  longitude: number;
  speed: number;
  congestionLevel: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}

export interface LineStop {
  id: string;
  lineId: string;
  stopId: string;
  stopOrder: number;
  distanceFromPrevious: number;
  travelTimeMinutes: number;
  stop: BusStop;
}

export interface BusArrival {
  id: string;
  busId: string;
  stopId: string;
  estimatedArrival: Date;
}
