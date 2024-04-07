import { UserType } from './UserType';
import { School } from './School';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserType;
  school?: School;
  schoolId?: string
}
