export interface VehicleLocation {
  vehicleid: number;
  userid: number;
  lat: number;
  lon: number;
  address: string;
}

export interface VehicleLocationData {
  data: VehicleLocation[];
}
