export interface VehicleLocation {
  vehicleid: number;
  lat: number;
  lon: number;
}

export interface VehicleLocationData {
  data: VehicleLocation[];
}
