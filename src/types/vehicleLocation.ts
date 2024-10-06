export interface VehicleLocation {
  vehicleid: number;
  lat: number;
  lon: number;
  address: string;
}

export interface VehicleLocationData {
  data: VehicleLocation[];
}
