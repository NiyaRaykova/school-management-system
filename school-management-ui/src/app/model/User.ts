import { UserType } from './UserType';
import { School } from './School';
import { Subject } from './Subject';

export interface User {
  id: number;
  email: string;
  schoolClass?: number;
  name?: string;
  role: UserType;
  school?: School;
  schoolId?: string;
  subjects?: Subject[];
}
