import { UserType } from './UserType';
import { School } from './School';
import { Program } from './Program';

export interface User {
  id: number;
  email: string;
  schoolClass?: number;
  name?: string;
  role: UserType;
  school?: School;
  schoolId?: string;
  programs?: Program[];
}
