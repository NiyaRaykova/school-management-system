import { UserType } from './UserType';

export interface User {
  id: number;
  name: string;
  email: string ;
  role: UserType ;
  schoolId? : number;
  // Marking fields as optional or nullable
}
