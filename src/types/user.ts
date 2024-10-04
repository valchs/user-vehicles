import { Owner } from 'types/owner';
import { Vehicle } from 'types/vehicle';

export interface User {
  userid: number;
  owner: Owner;
  vehicles: Vehicle[];
}

export interface UserData {
  data: User[];
}
